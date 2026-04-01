"use client"

import Image from "next/image"

const teamImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staf6-J8GKJy5vgARBTC6ZlPP19zLRDlTDZC.jpeg",
    alt: "Unser Team in der Küche",
    caption: "Das Carpe Diem Team",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staf3-YAZq9E97kk3Kq6fVPENjAOmozwuvNJ.jpeg",
    alt: "Team am Eingang",
    caption: "Herzlich Willkommen",
  },
]

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            La Nostra Famiglia
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Das Carpe Diem Team
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-xl font-serif italic">
            Herzlich Willkommen
          </p>
        </div>

        {/* Team Images - Only 2 images */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {teamImages.map((image, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ position: "absolute" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-serif text-xl italic">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staf4-Q4xNqgWtIzKJcfeFUEFSV43yg2cBVG.jpeg"
                alt="Gastfreundschaft im Carpe Diem"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                style={{ position: "absolute" }}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta/20 rounded-xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-sage/30 rounded-xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-wine mb-6">
              Unsere Geschichte
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Das Carpe Diem wurde 1990 mit einer einfachen Vision gegründet:
                authentische italienische Küche nach Berlin zu bringen. Was als
                kleine Pizzeria begann, ist heute ein beliebter Treffpunkt für
                Genießer aus ganz Berlin und darüber hinaus.
              </p>
              <p>
                Unsere Rezepte stammen aus den verschiedenen Regionen Italiens
                und werden von Generation zu Generation weitergegeben. Wir legen
                größten Wert auf frische, hochwertige Zutaten und authentische
                Zubereitungsmethoden.
              </p>
              <p>
                Das Herzstück unseres Restaurants ist unser traditioneller
                Steinofen, in dem unsere Pizzen bei perfekter Temperatur gebacken
                werden. Dazu servieren wir erlesene Weine aus den besten
                Anbaugebieten Italiens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
