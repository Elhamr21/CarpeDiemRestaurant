"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Clock, Mail, Check, Users, Calendar, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const openingHours = [
  { day: "Montag", hours: "Ruhetag", closed: true },
  { day: "Dienstag", hours: "Ruhetag", closed: true },
  { day: "Mittwoch", hours: "12:00 - 22:00" },
  { day: "Donnerstag", hours: "12:00 - 22:00" },
  { day: "Freitag", hours: "12:00 - 22:00" },
  { day: "Samstag", hours: "12:00 - 22:00" },
  { day: "Sonntag", hours: "12:00 - 22:00" },
]

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
]

export function ReservationSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    message: ""
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <section 
      id="reservation" 
      ref={sectionRef}
      className="py-24 bg-cream"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            Reservierung
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Tisch Reservieren
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Sichern Sie sich Ihren Platz für ein unvergessliches kulinarisches Erlebnis. 
            Wir freuen uns auf Ihren Besuch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className={cn(
            "space-y-6 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            {/* Address Card */}
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

            {/* Phone Card */}
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

            {/* Opening Hours Card */}
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
                    <span className={item.closed ? "text-muted-foreground" : "text-foreground"}>
                      {item.day}
                    </span>
                    <span className={item.closed ? "text-muted-foreground italic" : "text-wine font-medium"}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Reservation Form */}
          <div className={cn(
            "transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          )}>
            <div className="bg-parchment/80 backdrop-blur-sm p-8 md:p-10 rounded-lg shadow-xl border border-travertine/50">
              {isSubmitted ? (
                /* Success State */
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-sage-dark" />
                  </div>
                  <h3 className="font-serif text-2xl text-wine mb-4">
                    Vielen Dank!
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Ihre Reservierungsanfrage wurde erfolgreich übermittelt. 
                    Wir werden uns in Kürze bei Ihnen melden, um Ihre Reservierung zu bestätigen.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        guests: "2",
                        date: "",
                        time: "",
                        message: ""
                      })
                    }}
                    className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
                  >
                    Neue Reservierung
                  </button>
                </div>
              ) : (
                /* Reservation Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-2xl text-wine mb-2">
                      Online Reservierung
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Füllen Sie das Formular aus und wir bestätigen Ihre Reservierung
                    </p>
                  </div>

                  {/* Name */}
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

                  {/* Email & Phone */}
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
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  {/* Guests */}
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
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Person" : "Personen"}
                        </option>
                      ))}
                      <option value="10+">Mehr als 10 Personen</option>
                    </select>
                  </div>

                  {/* Date & Time */}
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
                        {timeSlots.map(time => (
                          <option key={time} value={time}>{time} Uhr</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full py-4 font-sans uppercase tracking-wider text-sm rounded-lg transition-all duration-300",
                      "bg-wine text-cream hover:bg-wine-dark",
                      "focus:outline-none focus:ring-2 focus:ring-wine/50 focus:ring-offset-2",
                      "shadow-lg hover:shadow-xl",
                      "disabled:opacity-70 disabled:cursor-not-allowed"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Wird gesendet...
                      </span>
                    ) : (
                      "Tisch reservieren"
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Oder rufen Sie uns an: <a href="tel:+493071136644" className="text-wine hover:text-terracotta transition-colors font-medium">030 711 36 44</a>
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
