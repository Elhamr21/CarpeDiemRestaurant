import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMAIL_FROM = process.env.EMAIL_FROM || 'reservierung@carp-diem.de';
const NOTIFICATION_TO = process.env.NOTIFICATION_TO || 'reservierung@carp-diem.de';

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;
const getResend = () => {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
};

type EmailRequest = {
  type: 'reservation' | 'contact' | 'reservation_confirmation' | 'reservation_received' | 'contact_received';
  payload: {
    name: string;
    email: string;
    phone?: string;
    date?: string;
    time?: string;
    guests?: number;
    specialRequests?: string;
    subject?: string;
    message?: string;
    status?: string;
  };
};

const formatDateTime = (date?: string, time?: string) => {
  if (!date) return '';
  const dateObj = new Date(date);
  const dateLabel = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Berlin',
  }).format(dateObj);
  return time ? `${dateLabel} um ${time} Uhr` : dateLabel;
};

const buildReservationEmail = (payload: EmailRequest['payload']) => ({
  subject: `Neue Reservierung - ${payload.name}`,
  body: `
Neue Reservierung eingegangen
-----------------------------
Name: ${payload.name}
E-Mail: ${payload.email}
Telefon: ${payload.phone || '-'}
Datum: ${formatDateTime(payload.date, payload.time)}
Anzahl Gäste: ${payload.guests}
Besondere Wünsche: ${payload.specialRequests || '-'}

Mit freundlichen Grüßen,
Carpe Diem System
  `.trim(),
});

const buildContactEmail = (payload: EmailRequest['payload']) => ({
  subject: `Kontaktanfrage: ${payload.subject}`,
  body: `
Kontaktformular Nachricht
-------------------------
Name: ${payload.name}
E-Mail: ${payload.email}
Telefon: ${payload.phone || '-'}
Betreff: ${payload.subject}

Nachricht:
${payload.message}

Mit freundlichen Grüßen,
Carpe Diem System
  `.trim(),
});

const buildConfirmationEmail = (payload: EmailRequest['payload']) => {
  const statusText = payload.status === 'confirmed' ? 'bestätigt' : 
                     payload.status === 'cancelled' ? 'storniert' : 'aktualisiert';
  return {
    subject: `Ihre Reservierung wurde ${statusText} - Carpe Diem`,
    body: `
Liebe/r ${payload.name},

Ihre Reservierung wurde ${statusText}.

Reservierungsdetails:
---------------------
Datum: ${formatDateTime(payload.date, payload.time)}
Anzahl Gäste: ${payload.guests}
${payload.specialRequests ? `Besondere Wünsche: ${payload.specialRequests}` : ''}

${payload.status === 'confirmed' 
  ? 'Wir freuen uns, Sie bei uns zu begrüßen!' 
  : payload.status === 'cancelled'
  ? 'Falls Sie Fragen haben, kontaktieren Sie uns gerne.'
  : ''
}

Mit freundlichen Grüßen,
Ihr Carpe Diem Team
    `.trim(),
  };
};

const buildReservationReceivedEmail = (payload: EmailRequest['payload']) => ({
  subject: `Reservierungsanfrage erhalten - Carpe Diem`,
  body: `
Liebe/r ${payload.name},

vielen Dank für Ihre Reservierungsanfrage bei Carpe Diem!

Wir haben folgende Anfrage erhalten:
------------------------------------
Datum: ${formatDateTime(payload.date, payload.time)}
Anzahl Gäste: ${payload.guests}
${payload.specialRequests ? `Besondere Wünsche: ${payload.specialRequests}` : ''}

Wir werden Ihre Anfrage schnellstmöglich bearbeiten und uns bei Ihnen melden.

Bei Fragen erreichen Sie uns unter:
Telefon: +49 30 68406609
E-Mail: reservierung@carp-diem.de

Mit freundlichen Grüßen,
Ihr Carpe Diem Team
  `.trim(),
});

const buildContactReceivedEmail = (payload: EmailRequest['payload']) => ({
  subject: `Ihre Nachricht wurde empfangen - Carpe Diem`,
  body: `
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
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json() as EmailRequest;
    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json({ error: 'Missing type or payload' }, { status: 400 });
    }

    let emailContent: { subject: string; body: string };
    let recipient: string;
    let replyTo: string | undefined;

    switch (type) {
      case 'reservation':
        emailContent = buildReservationEmail(payload);
        recipient = NOTIFICATION_TO;
        replyTo = payload.email;
        break;
      case 'contact':
        emailContent = buildContactEmail(payload);
        recipient = NOTIFICATION_TO;
        replyTo = payload.email;
        break;
      case 'reservation_confirmation':
        emailContent = buildConfirmationEmail(payload);
        recipient = payload.email;
        replyTo = NOTIFICATION_TO;
        break;
      case 'reservation_received':
        emailContent = buildReservationReceivedEmail(payload);
        recipient = payload.email;
        replyTo = NOTIFICATION_TO;
        break;
      case 'contact_received':
        emailContent = buildContactReceivedEmail(payload);
        recipient = payload.email;
        replyTo = NOTIFICATION_TO;
        break;
      default:
        return NextResponse.json({ error: `Unknown email type: ${type}` }, { status: 400 });
    }

    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: recipient,
      replyTo: replyTo,
      subject: emailContent.subject,
      text: emailContent.body,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`Email sent: ${type} to ${recipient}`);
    return NextResponse.json({ success: true, type, recipient });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
