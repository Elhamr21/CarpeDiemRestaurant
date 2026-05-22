"use client"

import Image from "next/image"

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/photos/cesar.png"
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
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
              La Nostra Storia
            </p>
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
                Ein wichtiger Teil dieser Geschichte ist Cesar, der seit vielen
                Jahren das Herz und die Seele unseres Restaurants prägt. Mit seiner
                Leidenschaft für italienische Küche und seinem Engagement hat er
                dazu beigetragen, dass Carpe Diem zu dem geworden ist, was es heute ist.
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
