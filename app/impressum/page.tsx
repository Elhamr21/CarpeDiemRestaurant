import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Impressum",
  description:
    "Impressum und Kontaktangaben des Carpe Diem Ristorante in Berlin-Lichterfelde.",
  path: "/impressum",
})

export default function Impressum() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-wine hover:text-wine-dark transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl italic text-wine mb-8">Impressum</h1>

        <div className="prose prose-sm max-w-none text-fig/80 space-y-6">
          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p>
                <strong>Carpe Diem - Enoteca Ristorante</strong>
              </p>
              <p>
                Lichterfelder Ring 129<br />
                12209 Berlin<br />
                Deutschland
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Kontaktinformation</h2>
            <div className="space-y-2">
              <p>
                <strong>Telefon:</strong> <a href="tel:+493071136644" className="text-wine hover:text-wine-dark">030 711 36 44</a>
              </p>
              <p>
                <strong>E-Mail:</strong> <span className="text-cream/50">info@carpediem-berlin.de</span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Betreiber und inhaltlich Verantwortlicher</h2>
            <p>
              Carpe Diem<br />
              Lichterfelder Ring 129<br />
              12209 Berlin
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Umsatzsteuer-Identifikationsnummer</h2>
            <p>
              Gemäß § 27 a UStG wird die Umsatzsteuer-Identifikationsnummer auf Anfrage mitgeteilt.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Gesetzliche Berufsbezeichnung</h2>
            <p>
              Gastwirt / Restaurantbetreiber
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Haftungsausschluss</h2>
            <h3 className="font-semibold text-wine mt-4 mb-2">Haftung für Inhalte</h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
              und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß
              § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
              §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
              fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
            <p className="mt-3">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen bleiben hiervon unberührt.
              Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich.
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
              zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten
              ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Erstellers. Downloads
              und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-3">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
              eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
              Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">Verbreiterhaftung</h2>
            <p>
              Wir sind nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Eine
              Verpflichtung zur Entfernung oder Sperrung der Nutzung von Informationen besteht nicht, solange wir von
              einer Rechtsverletzung keine Kenntnis haben.
            </p>
          </section>

          <section className="border-t border-wine/10 pt-6 mt-8">
            <p className="text-sm text-cream/50">
              Stand: {new Date().toLocaleDateString("de-DE")}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
