"use client"

import Image from "next/image"

export function MonatskartSection() {
  return (
    <section
      id="monatskarte"
      className="py-24"
      style={{ background: "linear-gradient(135deg, #fdf8f0 0%, #f5ede0 50%, #fdf8f0 100%)" }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-3">
            Giugno · Juni 2026
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4 leading-tight">
            Aktuelle Tageskarte
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-wine/30" />
            <span className="text-wine/40 text-lg">✦</span>
            <div className="h-px w-16 bg-wine/30" />
          </div>
          <p className="font-serif text-xl text-wine/60 italic">
            Aktuelle Empfehlungen des Hauses
          </p>
        </div>

        {/* Menu Image */}
        <div className="max-w-2xl mx-auto shadow-2xl rounded-sm overflow-hidden border border-wine/10">
          <Image
            src="/photos/image.png"
            alt="Monatskarte Pfifferlinge – Carpe Diem"
            width={950}
            height={1250}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Footer note */}
        <div className="mt-14 text-center">
          <p className="text-sm text-muted-foreground italic mb-6">
            Alle Gerichte werden täglich frisch zubereitet. Preise inkl. MwSt.
            Änderungen vorbehalten.
          </p>
          <a
            href="#reservation"
            className="inline-block bg-wine text-cream px-10 py-4 font-sans uppercase tracking-wider text-sm hover:bg-wine-dark transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
          >
            Tisch reservieren
          </a>
        </div>
      </div>
    </section>
  )
}
