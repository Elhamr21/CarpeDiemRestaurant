import { NextRequest, NextResponse } from "next/server";
import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const envValue = (value: string | undefined, fallback: string) =>
  value?.trim() || fallback;
const SIMPLE_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_RESTAURANT_EMAIL = "info@restaurant-carpe-diem.de";
const DEFAULT_RESERVATION_NOTIFICATION_TO =
  DEFAULT_RESTAURANT_EMAIL;
const RESERVATION_NOTIFICATION_TO = envValue(
  process.env.RESERVATION_NOTIFICATION_TO ||
    [process.env.RESERVATION_ADMIN_EMAIL, DEFAULT_RESERVATION_NOTIFICATION_TO]
      .filter(Boolean)
      .join(","),
  DEFAULT_RESERVATION_NOTIFICATION_TO,
);
const CONTACT_NOTIFICATION_TO = envValue(
  process.env.CONTACT_NOTIFICATION_TO || process.env.NOTIFICATION_TO,
  DEFAULT_RESTAURANT_EMAIL,
);
const SES_REGION = envValue(
  process.env.AWS_SES_REGION ||
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION,
  "eu-central-1",
);
const RESTAURANT_PHONE = envValue(
  process.env.RESTAURANT_PHONE,
  "+49 30 711 36 44",
);
const RESTAURANT_CONTACT_EMAIL = envValue(
  process.env.RESTAURANT_CONTACT_EMAIL,
  DEFAULT_RESTAURANT_EMAIL,
);

class EmailConfigurationError extends Error {}

type EmailDeliveryStatus = "sent" | "partial" | "failed";

let sesClient: SESv2Client | null = null;

const getSesClient = () => {
  if (!sesClient) {
    sesClient = new SESv2Client({ region: SES_REGION });
  }

  return sesClient;
};

const getEmailFrom = () => {
  const emailFrom =
    process.env.EMAIL_FROM?.trim() ||
    "Carpe Diem <noreply@restaurant-carpe-diem.de>";

  if (!emailFrom) {
    throw new EmailConfigurationError("EMAIL_FROM is not configured.");
  }

  return emailFrom;
};

const getConfiguredRecipient = (value: string, envName: string) => {
  const email = value.trim();

  if (!SIMPLE_EMAIL_PATTERN.test(email)) {
    throw new EmailConfigurationError(`${envName} is not a valid email.`);
  }

  return email;
};

const getConfiguredRecipients = (value: string, envName: string) => {
  const emails = value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (emails.length === 0) {
    throw new EmailConfigurationError(`${envName} is not configured.`);
  }

  for (const email of emails) {
    if (!SIMPLE_EMAIL_PATTERN.test(email)) {
      throw new EmailConfigurationError(`${envName} contains an invalid email.`);
    }
  }

  return Array.from(new Set(emails));
};

const extractEmailAddress = (value: string) =>
  value.match(/<([^<>@\s]+@[^<>@\s]+\.[^<>@\s]+)>/)?.[1] ||
  value.match(/^[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/)?.[0] ||
  null;

const getReservationNotificationEmails = () =>
  getConfiguredRecipients(
    RESERVATION_NOTIFICATION_TO,
    "RESERVATION_NOTIFICATION_TO",
  );

const getContactNotificationEmail = () =>
  getConfiguredRecipient(CONTACT_NOTIFICATION_TO, "CONTACT_NOTIFICATION_TO");

const getReplyToEmail = () => {
  const explicitReplyTo = process.env.EMAIL_REPLY_TO?.trim();

  if (explicitReplyTo) {
    return getConfiguredRecipient(explicitReplyTo, "EMAIL_REPLY_TO");
  }

  if (RESTAURANT_CONTACT_EMAIL) {
    return getConfiguredRecipient(
      RESTAURANT_CONTACT_EMAIL,
      "RESTAURANT_CONTACT_EMAIL",
    );
  }

  const senderEmail = extractEmailAddress(getEmailFrom());
  return senderEmail
    ? getConfiguredRecipient(senderEmail, "EMAIL_FROM")
    : undefined;
};

const trimmedString = (field: string, maxLength = 200) =>
  z
    .string({ required_error: `${field} fehlt.` })
    .trim()
    .min(1, `${field} fehlt.`)
    .max(maxLength, `${field} ist zu lang.`);

const optionalTrimmedString = (maxLength = 2000) =>
  z.preprocess((value) => {
    if (typeof value !== "string") {
      return value;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }, z.string().max(maxLength, "Der Text ist zu lang.").optional());

const emailAddressSchema = z
  .string({ required_error: "E-Mail fehlt." })
  .trim()
  .email("Bitte eine gültige E-Mail-Adresse eingeben.")
  .max(254, "Die E-Mail-Adresse ist zu lang.");

const dateSchema = z
  .string({ required_error: "Datum fehlt." })
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Bitte ein gültiges Datum eingeben.")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));

    return (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day
    );
  }, "Bitte ein gültiges Datum eingeben.");

const timeSchema = z
  .string({ required_error: "Uhrzeit fehlt." })
  .trim()
  .regex(
    /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
    "Bitte eine gültige Uhrzeit eingeben.",
  );

const reservationBasePayloadSchema = z.object({
  reservationId: optionalTrimmedString(120),
  name: trimmedString("Name", 120),
  email: emailAddressSchema,
  phone: trimmedString("Telefon", 60),
  date: dateSchema,
  time: timeSchema,
  guests: z.coerce
    .number({ required_error: "Anzahl der Gäste fehlt." })
    .int("Bitte eine gültige Anzahl an Gästen eingeben.")
    .min(1, "Bitte eine gültige Anzahl an Gästen eingeben.")
    .max(200, "Bitte rufen Sie uns für sehr große Gruppen direkt an."),
  specialRequests: optionalTrimmedString(2000),
});

const reservationStatusPayloadSchema = reservationBasePayloadSchema
  .omit({ phone: true })
  .extend({
    phone: optionalTrimmedString(60),
    status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
  });

const contactPayloadSchema = z.object({
  name: trimmedString("Name", 120),
  email: emailAddressSchema,
  phone: optionalTrimmedString(60),
  subject: trimmedString("Betreff", 160),
  message: trimmedString("Nachricht", 3000),
});

const emailRequestSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("reservation_request"),
    payload: reservationBasePayloadSchema,
  }),
  z.object({
    type: z.literal("reservation"),
    payload: reservationBasePayloadSchema,
  }),
  z.object({
    type: z.literal("reservation_received"),
    payload: reservationBasePayloadSchema,
  }),
  z.object({
    type: z.literal("reservation_confirmation"),
    payload: reservationStatusPayloadSchema,
  }),
  z.object({
    type: z.literal("contact"),
    payload: contactPayloadSchema,
  }),
  z.object({
    type: z.literal("contact_received"),
    payload: contactPayloadSchema,
  }),
]);

type ReservationPayload = z.infer<typeof reservationBasePayloadSchema>;
type ReservationStatusPayload = z.infer<typeof reservationStatusPayloadSchema>;
type ContactPayload = z.infer<typeof contactPayloadSchema>;

type EmailContent = {
  subject: string;
  text: string;
  html: string;
};

type EmailMessage = EmailContent & {
  to: string | string[];
  replyTo?: string | string[];
};

type DetailRow = [string, string | number | undefined];

const formatTimeLabel = (time?: string) => {
  if (!time) {
    return "";
  }

  return /^\d{2}:\d{2}/.test(time) ? time.slice(0, 5) : time;
};

const formatDateTime = (date?: string, time?: string) => {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split("-").map(Number);
  const dateObject = new Date(Date.UTC(year, month - 1, day, 12));
  const dateLabel = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(dateObject);

  const timeLabel = formatTimeLabel(time);
  return timeLabel ? `${dateLabel} um ${timeLabel} Uhr` : dateLabel;
};

const formatGuestCount = (
  guests: number,
  specialRequests?: string,
  includeNoun = true,
) => {
  if (
    guests === 10 &&
    specialRequests &&
    /mehr als 10|große gruppe/i.test(specialRequests)
  ) {
    return "Mehr als 10 Personen";
  }

  if (!includeNoun) {
    return String(guests);
  }

  return `${guests} ${guests === 1 ? "Person" : "Personen"}`;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const nl2br = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

const buildDetailsText = (rows: DetailRow[]) =>
  rows
    .map(([label, value]) => `${label}: ${value === undefined || value === "" ? "-" : value}`)
    .join("\n");

const buildDetailsHtml = (rows: DetailRow[]) => `
  <table role="presentation" style="width:100%;border-collapse:collapse;margin:20px 0;">
    <tbody>
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="padding:8px 0;color:#6b5f58;font-weight:600;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:8px 0;color:#2f2623;vertical-align:top;">${
                value === undefined || value === "" ? "-" : nl2br(String(value))
              }</td>
            </tr>
          `,
        )
        .join("")}
    </tbody>
  </table>
`;

const wrapEmailHtml = (title: string, body: string) => `
  <div style="margin:0;padding:0;background:#f8f3ea;">
    <div style="max-width:640px;margin:0 auto;padding:28px 18px;font-family:Arial,Helvetica,sans-serif;color:#2f2623;">
      <div style="background:#fffaf2;border:1px solid #e4d5c3;border-radius:8px;padding:28px;">
        <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#9b442f;">Carpe Diem</p>
        <h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:#6f1d2c;">${escapeHtml(title)}</h1>
        ${body}
      </div>
    </div>
  </div>
`;

const buildReservationRows = (payload: ReservationPayload): DetailRow[] => [
  ["Name", payload.name],
  ["E-Mail", payload.email],
  ["Telefon", payload.phone],
  ["Datum und Uhrzeit", formatDateTime(payload.date, payload.time)],
  ["Gäste", formatGuestCount(payload.guests, payload.specialRequests)],
  ["Besondere Wünsche", payload.specialRequests],
  ["Reservierungs-ID", payload.reservationId],
];

const buildReservationEmail = (payload: ReservationPayload): EmailContent => {
  const rows = buildReservationRows(payload);

  return {
    subject: `Neue Online-Reservierung: ${payload.name}`,
    text: `
Neue Online-Reservierung eingegangen
------------------------------------
${buildDetailsText(rows)}

Diese Reservierung wurde automatisch bestätigt.
    `.trim(),
    html: wrapEmailHtml(
      "Neue Online-Reservierung",
      `
        <p style="margin:0 0 14px;line-height:1.55;">Eine neue Online-Reservierung ist über die Website eingegangen.</p>
        ${buildDetailsHtml(rows)}
        <p style="margin:20px 0 0;line-height:1.55;">Diese Reservierung wurde automatisch bestätigt.</p>
      `,
    ),
  };
};

const buildContactEmail = (payload: ContactPayload): EmailContent => ({
  subject: `Kontaktanfrage: ${payload.subject}`,
  text: `
Kontaktformular Nachricht
-------------------------
Name: ${payload.name}
E-Mail: ${payload.email}
Telefon: ${payload.phone || "-"}
Betreff: ${payload.subject}

Nachricht:
${payload.message}

Mit freundlichen Grüßen,
Carpe Diem System
  `.trim(),
  html: wrapEmailHtml(
    "Neue Kontaktanfrage",
    `
      ${buildDetailsHtml([
        ["Name", payload.name],
        ["E-Mail", payload.email],
        ["Telefon", payload.phone],
        ["Betreff", payload.subject],
        ["Nachricht", payload.message],
      ])}
    `,
  ),
});

const buildConfirmationEmail = (
  payload: ReservationStatusPayload,
): EmailContent => {
  const statusText =
    payload.status === "confirmed"
      ? "bestätigt"
      : payload.status === "cancelled"
        ? "storniert"
        : "aktualisiert";
  const rows: DetailRow[] = [
    ["Datum und Uhrzeit", formatDateTime(payload.date, payload.time)],
    ["Gäste", formatGuestCount(payload.guests, payload.specialRequests)],
    ["Besondere Wünsche", payload.specialRequests],
  ];

  return {
    subject: `Ihre Reservierung wurde ${statusText} - Carpe Diem`,
    text: `
Liebe/r ${payload.name},

Ihre Reservierung wurde ${statusText}.

Reservierungsdetails:
---------------------
${buildDetailsText(rows)}

${payload.status === "confirmed" ? "Wir freuen uns, Sie bei uns zu begrüßen!" : ""}
${payload.status === "cancelled" ? "Falls Sie Fragen haben, kontaktieren Sie uns gerne." : ""}

Mit freundlichen Grüßen,
Ihr Carpe Diem Team
    `.trim(),
    html: wrapEmailHtml(
      `Ihre Reservierung wurde ${statusText}`,
      `
        <p style="margin:0 0 14px;line-height:1.55;">Liebe/r ${escapeHtml(payload.name)},</p>
        <p style="margin:0 0 14px;line-height:1.55;">Ihre Reservierung wurde ${escapeHtml(statusText)}.</p>
        ${buildDetailsHtml(rows)}
        ${
          payload.status === "confirmed"
            ? '<p style="margin:20px 0 0;line-height:1.55;">Wir freuen uns, Sie bei uns zu begrüßen.</p>'
            : ""
        }
        ${
          payload.status === "cancelled"
            ? '<p style="margin:20px 0 0;line-height:1.55;">Falls Sie Fragen haben, kontaktieren Sie uns gerne.</p>'
            : ""
        }
        <p style="margin:24px 0 0;line-height:1.55;">Mit freundlichen Grüßen<br />Ihr Carpe Diem Team</p>
      `,
    ),
  };
};

const buildReservationReceivedEmail = (
  payload: ReservationPayload,
): EmailContent => {
  const rows: DetailRow[] = [
    ["Name", payload.name],
    ["Telefon", payload.phone],
    ["Datum und Uhrzeit", formatDateTime(payload.date, payload.time)],
    ["Gäste", formatGuestCount(payload.guests, payload.specialRequests)],
    ["Besondere Wünsche", payload.specialRequests],
  ];

  return {
    subject: "Ihre Reservierungsanfrage ist eingegangen - Carpe Diem",
    text: `
Liebe/r ${payload.name},

vielen Dank für Ihre Reservierungsanfrage bei Carpe Diem!

Wir haben folgende Anfrage erhalten:
------------------------------------
${buildDetailsText(rows)}

Ihre Reservierung ist noch nicht endgültig bestätigt. Wir prüfen die Anfrage und melden uns schnellstmöglich bei Ihnen.

Bei Fragen erreichen Sie uns unter:
Telefon: ${RESTAURANT_PHONE}
E-Mail: ${RESTAURANT_CONTACT_EMAIL}

Mit freundlichen Grüßen,
Ihr Carpe Diem Team
    `.trim(),
    html: wrapEmailHtml(
      "Reservierungsanfrage eingegangen",
      `
        <p style="margin:0 0 14px;line-height:1.55;">Liebe/r ${escapeHtml(payload.name)},</p>
        <p style="margin:0 0 14px;line-height:1.55;">vielen Dank für Ihre Reservierungsanfrage bei Carpe Diem.</p>
        ${buildDetailsHtml(rows)}
        <p style="margin:20px 0 0;line-height:1.55;"><strong>Ihre Reservierung ist noch nicht endgültig bestätigt.</strong> Wir prüfen die Anfrage und melden uns schnellstmöglich bei Ihnen.</p>
        <p style="margin:20px 0 0;line-height:1.55;">Bei Fragen erreichen Sie uns unter ${escapeHtml(RESTAURANT_PHONE)} oder ${escapeHtml(RESTAURANT_CONTACT_EMAIL)}.</p>
        <p style="margin:24px 0 0;line-height:1.55;">Mit freundlichen Grüßen<br />Ihr Carpe Diem Team</p>
      `,
    ),
  };
};

const buildContactReceivedEmail = (payload: ContactPayload): EmailContent => ({
  subject: "Ihre Nachricht wurde empfangen - Carpe Diem",
  text: `
Liebe/r ${payload.name},

vielen Dank für Ihre Nachricht!

Wir haben Ihre Anfrage erhalten:
--------------------------------
Betreff: ${payload.subject}

Ihre Nachricht:
${payload.message}

Wir werden uns schnellstmöglich bei Ihnen melden.

Mit freundlichen Grüßen,
Ihr Carpe Diem Team
  `.trim(),
  html: wrapEmailHtml(
    "Nachricht eingegangen",
    `
      <p style="margin:0 0 14px;line-height:1.55;">Liebe/r ${escapeHtml(payload.name)},</p>
      <p style="margin:0 0 14px;line-height:1.55;">vielen Dank für Ihre Nachricht. Wir werden uns schnellstmöglich bei Ihnen melden.</p>
      ${buildDetailsHtml([
        ["Betreff", payload.subject],
        ["Nachricht", payload.message],
      ])}
      <p style="margin:24px 0 0;line-height:1.55;">Mit freundlichen Grüßen<br />Ihr Carpe Diem Team</p>
    `,
  ),
});

const toAddressList = (value: string | string[]) =>
  Array.isArray(value) ? value : [value];

const sendEmail = async (message: EmailMessage, label: string) => {
  try {
    const recipients = toAddressList(message.to);
    const result = await getSesClient().send(
      new SendEmailCommand({
        FromEmailAddress: getEmailFrom(),
        Destination: {
          ToAddresses: recipients,
        },
        ReplyToAddresses: message.replyTo
          ? toAddressList(message.replyTo)
          : undefined,
        Content: {
          Simple: {
            Subject: {
              Data: message.subject,
              Charset: "UTF-8",
            },
            Body: {
              Text: {
                Data: message.text,
                Charset: "UTF-8",
              },
              Html: {
                Data: message.html,
                Charset: "UTF-8",
              },
            },
          },
        },
      }),
    );

    console.info("SES email sent:", {
      label,
      messageId: result.MessageId,
      recipientCount: recipients.length,
    });

    return { id: result.MessageId };
  } catch (error) {
    console.error("SES email send failed:", {
      label,
      errorName: error instanceof Error ? error.name : undefined,
      errorMessage: error instanceof Error ? error.message : String(error),
    });

    throw error instanceof Error
      ? error
      : new Error("SES email send failed.");
  }
};

const getReservationEmailStatus = (
  failedEmails: string[],
): EmailDeliveryStatus => {
  if (failedEmails.length === 0) {
    return "sent";
  }

  return failedEmails.length === 2 ? "failed" : "partial";
};

const sendReservationRequestEmails = async (payload: ReservationPayload) => {
  const adminEmail = buildReservationEmail(payload);
  const customerEmail = buildConfirmationEmail({
    ...payload,
    status: "confirmed",
  });
  const messages = [
    {
      label: "reservation-admin",
      promise: sendEmail(
        {
          ...adminEmail,
          to: getReservationNotificationEmails(),
          replyTo: payload.email,
        },
        "reservation-admin",
      ),
    },
    {
      label: "reservation-customer",
      promise: sendEmail(
        {
          ...customerEmail,
          to: payload.email,
          replyTo: getReplyToEmail(),
        },
        "reservation-customer",
      ),
    },
  ];

  const results = await Promise.allSettled(
    messages.map((message) => message.promise),
  );
  const failures = results
    .map((result, index) =>
      result.status === "rejected" ? messages[index].label : null,
    )
    .filter((label): label is string => Boolean(label));

  if (failures.length > 0) {
    console.error("Reservation email delivery incomplete:", {
      reservationId: payload.reservationId,
      failedEmails: failures,
    });
  }

  return {
    emailDeliveryStatus: getReservationEmailStatus(failures),
    failedEmails: failures,
    adminEmailId:
      results[0].status === "fulfilled" ? results[0].value?.id : undefined,
    customerEmailId:
      results[1].status === "fulfilled" ? results[1].value?.id : undefined,
  };
};

const validationMessage = (error: z.ZodError) =>
  error.issues.map((issue) => issue.message).join(" ");

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { type, payload } = emailRequestSchema.parse(body);

    if (type === "reservation_request") {
      const result = await sendReservationRequestEmails(payload);
      return NextResponse.json(
        { success: true, type, ...result },
        { status: result.emailDeliveryStatus === "sent" ? 200 : 207 },
      );
    }

    let emailContent: EmailContent;
    let recipient: string | string[];
    let replyTo: string | undefined;

    switch (type) {
      case "reservation":
        emailContent = buildReservationEmail(payload);
        recipient = getReservationNotificationEmails();
        replyTo = payload.email;
        break;
      case "contact":
        emailContent = buildContactEmail(payload);
        recipient = getContactNotificationEmail();
        replyTo = payload.email;
        break;
      case "reservation_confirmation":
        emailContent = buildConfirmationEmail(payload);
        recipient = payload.email;
        replyTo = getReplyToEmail();
        break;
      case "reservation_received":
        emailContent = buildReservationReceivedEmail(payload);
        recipient = payload.email;
        replyTo = getReplyToEmail();
        break;
      case "contact_received":
        emailContent = buildContactReceivedEmail(payload);
        recipient = payload.email;
        replyTo = getReplyToEmail();
        break;
      default:
        const exhaustiveCheck: never = type;
        void exhaustiveCheck;
        throw new Error("Unknown email type.");
    }

    const result = await sendEmail(
      {
        ...emailContent,
        to: recipient,
        replyTo,
      },
      type,
    );

    return NextResponse.json({
      success: true,
      type,
      to: recipient,
      emailId: result?.id,
    });
  } catch (sendError) {
    console.error("Email send error:", sendError);

    if (sendError instanceof z.ZodError) {
      return NextResponse.json(
        { error: validationMessage(sendError) || "Ungültige Anfrage." },
        { status: 400 },
      );
    }

    if (sendError instanceof EmailConfigurationError) {
      return NextResponse.json(
        {
          error:
            "Der E-Mail-Versand ist nicht vollständig konfiguriert. Bitte prüfen Sie EMAIL_FROM, AWS_SES_REGION und die SES-Berechtigungen.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error:
          sendError instanceof Error
            ? sendError.message
            : "Die E-Mail konnte nicht versendet werden.",
      },
      { status: 500 },
    );
  }
}
