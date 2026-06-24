import Image from "next/image";

export function OurStory() {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-4">
                La Nostra Storia
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-wine mb-8 leading-tight">
                Unsere Geschichte
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Das Carpe Diem wurde mit einer einfachen Vision gegründet:
                authentische italienische Küche nach Berlin-Lichterfelde zu
                bringen. Was als kleine Pizzeria begann, ist heute ein beliebter
                Treffpunkt für Genießer aus ganz Berlin und darüber hinaus.
              </p>

              <p>
                Ein wichtiger Teil dieser Geschichte ist{" "}
                <strong className="text-wine font-semibold">
                  GIUSEPPE BIANCO (PEPE)
                </strong>
                , der seit vielen Jahren das Herz und die Seele unseres
                Restaurants prägt. Mit seiner Leidenschaft für authentische
                italienische Küche und seinem unermüdlichen Engagement hat er
                Carpe Diem zu dem gemacht, was es heute ist.
              </p>

              <p>
                Unsere Rezepte stammen aus den verschiedenen Regionen Italiens
                und werden von Generation zu Generation weitergegeben. Wir legen
                größten Wert auf frische, hochwertige Zutaten und authentische
                Zubereitungsmethoden.
              </p>

              <p>
                Das Herzstück unseres Restaurants ist unser traditioneller
                Steinofen, in dem unsere Pizzen bei perfekter Temperatur
                gebacken werden. Dazu servieren wir erlesene Weine aus den
                besten Anbaugebieten Italiens.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/photos/1000028487.jpg"
              alt="Atmosphäre im Carpe Diem Ristorante Berlin-Lichterfelde"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
