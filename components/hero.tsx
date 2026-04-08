"use client"

import { useEffect, useState } from "react"
import { ChevronDown, MapPin, Clock, Star } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6222581-uhd_3840_2160_24fps-v4QSSQVpUZhAz20A02rygTBXfMPMoh.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-fig/70 via-wine/50 to-fig/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Tagline */}
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-cream/80 mb-2 sm:mb-4">
            Seit 1990 in Berlin-Lichterfelde
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-cream mb-1 sm:mb-2 italic">
            Carpe Diem
          </h1>
          <p className="font-serif text-base sm:text-xl md:text-2xl text-cream/90 mb-4 sm:mb-8">
             Ristorante Italiano
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto font-sans text-cream/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-12">
            Erleben Sie authentische italienische Küche mit hausgemachter Pasta,
            traditioneller Pizza aus dem Steinofen und erlesenen Weinen
            aus den besten Regionen Italiens.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-16 w-full px-2 sm:px-0">
            <a
              href="https://www.quandoo.de/de/restaurant/carpe-diem-berlin-lichterfelde-3708"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-terracotta text-cream px-6 sm:px-10 py-3 sm:py-4 font-sans uppercase tracking-wider text-xs sm:text-sm hover:bg-terracotta-dark transition-all duration-300 rounded-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Tisch Reservieren
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
            <a
              href="#menu"
              className="border border-cream/40 text-cream px-6 sm:px-10 py-3 sm:py-4 font-sans uppercase tracking-wider text-xs sm:text-sm hover:bg-cream/10 transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
            >
              Speisekarte Ansehen
            </a>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto px-2 sm:px-0">
            <div className="flex items-center gap-3 bg-cream/10 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-sm">
              <Star className="w-5 h-5 text-saffron flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-cream font-sans text-xs sm:text-sm break-words">4.7 Sterne</p>
                <p className="text-cream/60 text-xs">527 Bewertungen</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-cream/10 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-sm">
              <Clock className="w-5 h-5 text-sage flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-cream font-sans text-xs sm:text-sm break-words">Mi - So: 12 - 22</p>
                <p className="text-cream/60 text-xs">Mo & Di Ruhetag</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-cream/10 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-sm">
              <MapPin className="w-5 h-5 text-terracotta flex-shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-cream font-sans text-xs sm:text-sm break-words">Lichterfelder Ring</p>
                <p className="text-cream/60 text-xs">12209 Berlin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-cream/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  )
}
