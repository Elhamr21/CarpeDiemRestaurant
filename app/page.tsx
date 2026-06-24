import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { OurStory } from "@/components/our-story";
import { MenuSection } from "@/components/menu-section";
import { MonatskartSection } from "@/components/monatskarte-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { GallerySection } from "@/components/gallery-section";
import { ReservationSection } from "@/components/reservation-section";
import { Footer } from "@/components/footer";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navigation />
      <Hero />

      {/* Intro Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-4">
              Benvenuti
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-wine mb-6 leading-tight">
              Willkommen im Carpe Diem
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Seit über 25 Jahren bringen wir die authentischen Aromen Italiens
              nach Berlin-Lichterfelde. Unsere Küche vereint traditionelle
              Familienrezepte mit frischen, hochwertigen Zutaten – von der
              hausgemachten Pasta bis zur Pizza aus dem Steinofen.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="font-serif text-4xl text-wine">25+</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Jahre Tradition
                </p>
              </div>
              <div className="w-px bg-travertine" />
              <div>
                <p className="font-serif text-4xl text-wine">4.7</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Sterne Bewertung
                </p>
              </div>
              <div className="w-px bg-travertine" />
              <div>
                <p className="font-serif text-4xl text-wine">527</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Zufriedene Gäste
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurStory />
      <MenuSection />
      <MonatskartSection />
      <TestimonialsSection />
      <GallerySection />
      <ReservationSection />
      <Footer />
    </main>
  );
}
