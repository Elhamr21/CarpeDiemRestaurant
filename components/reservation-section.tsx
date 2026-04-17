"use client"

import { useEffect, useRef, useState } from "react"
import {
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react"
import { getAmplifyErrorMessage, getDataClient } from "@/lib/amplify"
import { cn } from "@/lib/utils"

const openingHours = [
  { day: "Montag", hours: "12:00 - 23:00" },
  { day: "Dienstag", hours: "Ruhetag", closed: true },
  { day: "Mittwoch", hours: "12:00 - 23:00" },
  { day: "Donnerstag", hours: "12:00 - 23:00" },
  { day: "Freitag", hours: "12:00 - 23:00" },
  { day: "Samstag", hours: "12:00 - 23:00" },
  { day: "Sonntag", hours: "12:00 - 23:00" },
]

const timeSlots = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
]

const GENERIC_SUBMIT_ERROR =
  "Fehler beim Absenden der Reservierung. Bitte versuchen Sie es erneut."

const createInitialFormData = () => ({
  name: "",
  email: "",
  phone: "",
  guests: "2",
  date: "",
  time: "",
  message: "",
})

const asNonEmptyString = (value: unknown) => {
  if (typeof value !== "string") {
    return null
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const firstGraphQlErrorMessage = (value: unknown) => {
  if (!Array.isArray(value)) {
    return null
  }

  for (const item of value) {
    const directMessage = asNonEmptyString(item)
    if (directMessage) {
      return directMessage
    }

    if (typeof item === "object" && item !== null) {
      const nestedMessage = asNonEmptyString(
        (item as Record<string, unknown>).message,
      )

      if (nestedMessage) {
        return nestedMessage
      }
    }
  }

  return null
}

const toAwsTime = (value: string) => {
  const trimmed = value.trim()

  if (/^\d{2}:\d{2}:\d{2}$/.test(trimmed)) {
    return trimmed
  }

  if (/^\d{2}:\d{2}$/.test(trimmed)) {
    return `${trimmed}:00`
  }

  throw new Error("Bitte eine gültige Uhrzeit auswählen.")
}

const normalizeSpecialRequests = (message: string, guests: string) => {
  const notes: string[] = []

  if (guests === "10+") {
    notes.push("Große Gruppe: mehr als 10 Personen.")
  }

  const trimmedMessage = message.trim()
  if (trimmedMessage) {
    notes.push(trimmedMessage)
  }

  return notes.join("\n")
}

const getSubmitErrorMessage = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    const errorObject = error as Record<string, unknown>
    const directMessage = asNonEmptyString(errorObject.message)
    const errorsMessage = firstGraphQlErrorMessage(errorObject.errors)
    const graphQLErrorsMessage = firstGraphQlErrorMessage(
      errorObject.graphQLErrors,
    )

    const resolvedMessage =
      directMessage ?? errorsMessage ?? graphQLErrorsMessage

    if (resolvedMessage) {
      return resolvedMessage
    }
  }

  return getAmplifyErrorMessage(error) || GENERIC_SUBMIT_ERROR
}

export function ReservationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState(createInitialFormData)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const client = await getDataClient()
      const guests =
        formData.guests === "10+"
          ? 10
          : Number.parseInt(formData.guests, 10)

      if (!Number.isFinite(guests) || guests <= 0) {
        throw new Error("Bitte wählen Sie eine gültige Anzahl an Gästen.")
      }

      const awsTime = toAwsTime(formData.time)
      const specialRequests = normalizeSpecialRequests(
        formData.message,
        formData.guests,
      )

      const { data, errors } = await client.models.Reservation.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: awsTime,
        guests,
        specialRequests: specialRequests || undefined,
        status: "pending",
      })

      if (errors?.length) {
        throw new Error(firstGraphQlErrorMessage(errors) || GENERIC_SUBMIT_ERROR)
      }

      if (!data) {
        throw new Error(GENERIC_SUBMIT_ERROR)
      }

      const emailPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests,
        specialRequests: specialRequests || undefined,
      }

      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reservation",
          payload: emailPayload,
        }),
      }).catch(console.error)

      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "reservation_received",
          payload: emailPayload,
        }),
      }).catch(console.error)

      setFormData(createInitialFormData())
      setIsSubmitted(true)
    } catch (error) {
      console.error("Reservation submit error:", error)
      setSubmitError(getSubmitErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0]

  return (
    <section id="reservation" ref={sectionRef} className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            Reservierung
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Tisch Reservieren
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Sichern Sie sich Ihren Platz für ein unvergessliches kulinarisches
            Erlebnis. Wir freuen uns auf Ihren Besuch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-y-0 xl:translate-x-0"
                : "opacity-0 translate-y-8 xl:translate-y-0 xl:-translate-x-8",
            )}
          >
            <div className="bg-parchment/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-travertine/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-wine/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-wine" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-wine mb-2">Adresse</h3>
                  <p className="text-foreground">Lichterfelder Ring 129</p>
                  <p className="text-foreground">12209 Berlin-Lichterfelde</p>
                </div>
              </div>
            </div>

            <div className="bg-parchment/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-travertine/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-wine/10 rounded-lg">
                  <Phone className="w-6 h-6 text-wine" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-wine mb-2">Telefon</h3>
                  <a
                    href="tel:+493071136644"
                    className="text-2xl font-serif text-foreground hover:text-terracotta transition-colors"
                  >
                    030 711 36 44
                  </a>
                  <p className="text-muted-foreground text-sm mt-2">
                    Für telefonische Reservierungen
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-parchment/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-travertine/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-wine/10 rounded-lg">
                  <Clock className="w-6 h-6 text-wine" />
                </div>
                <h3 className="font-serif text-xl text-wine">Öffnungszeiten</h3>
              </div>
              <div className="space-y-2">
                {openingHours.map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-2 border-b border-travertine/50 last:border-0"
                  >
                    <span
                      className={item.closed ? "text-muted-foreground" : "text-foreground"}
                    >
                      {item.day}
                    </span>
                    <span
                      className={
                        item.closed
                          ? "text-muted-foreground italic"
                          : "text-wine font-medium"
                      }
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-400",
              isVisible
                ? "opacity-100 translate-y-0 xl:translate-x-0"
                : "opacity-0 translate-y-8 xl:translate-y-0 xl:translate-x-8",
            )}
          >
            <div className="bg-parchment/80 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-xl border border-travertine/50">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-sage-dark" />
                  </div>
                  <h3 className="font-serif text-2xl text-wine mb-4">
                    Vielen Dank!
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Ihre Reservierungsanfrage wurde erfolgreich übermittelt. Wir
                    werden uns in Kürze bei Ihnen melden, um Ihre Reservierung zu
                    bestätigen.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setSubmitError("")
                      setFormData(createInitialFormData())
                    }}
                    className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
                  >
                    Neue Reservierung
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl text-wine mb-2">
                      Online Reservierung
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Füllen Sie das Formular aus und wir bestätigen Ihre
                      Reservierung
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Name <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        <Mail className="w-4 h-4 inline mr-2" />
                        E-Mail <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                        placeholder="ihre@email.de"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Telefon <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                        placeholder="+49 30 711 36 44"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="guests" className="block text-sm font-medium text-foreground">
                      <Users className="w-4 h-4 inline mr-2" />
                      Anzahl der Gäste <span className="text-terracotta">*</span>
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      required
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Person" : "Personen"}
                        </option>
                      ))}
                      <option value="10+">Mehr als 10 Personen</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="date" className="block text-sm font-medium text-foreground">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Datum <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="time" className="block text-sm font-medium text-foreground">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Uhrzeit <span className="text-terracotta">*</span>
                      </label>
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground appearance-none cursor-pointer"
                      >
                        <option value="">Uhrzeit wählen</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time} Uhr
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Nachricht <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cream border border-travertine rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all duration-200 text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Besondere Wünsche oder Anmerkungen..."
                    />
                  </div>

                  {submitError && (
                    <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 font-sans uppercase tracking-wider text-sm rounded-lg transition-all duration-300",
                      "bg-wine text-cream hover:bg-wine-dark",
                      "focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2",
                      "shadow-lg hover:shadow-xl",
                      "disabled:opacity-70 disabled:cursor-not-allowed",
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Wird gesendet...
                      </span>
                    ) : (
                      "Tisch reservieren"
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Oder rufen Sie uns an:{" "}
                    <a
                      href="tel:+493071136644"
                      className="text-wine hover:text-terracotta transition-colors font-medium"
                    >
                      030 711 36 44
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
