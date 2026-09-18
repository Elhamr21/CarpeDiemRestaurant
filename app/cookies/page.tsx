import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Cookie-Richtlinie",
  description: "Cookie-Richtlinie des Carpe Diem Ristorante in Berlin-Lichterfelde.",
  path: "/cookies",
})

const sections = [
  {
    title: "1. Was sind Cookies?",
    body: "Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Website besuchen. Sie ermöglichen es unter anderem, Informationen über Ihr Nutzungsverhalten zu speichern.",
  },
  {
    title: "2. Technisch notwendige Cookies",
    body: "Wir setzen technisch notwendige Cookies ein, die für den sicheren und störungsfreien Betrieb der Website erforderlich sind (Art. 6 Abs. 1 lit. f DSGVO, § 25 Abs. 2 Nr. 2 TTDSG). Diese können nicht deaktiviert werden.",
  },
  {
    title: "3. Analyse-Cookies (Google Analytics)",
    body: "Sofern Sie einwilligen, verwenden wir Google Analytics zur anonymisierten Reichweitenmessung. Dabei werden Cookies gesetzt und Daten an Google LLC übertragen. Diese Cookies werden erst nach Ihrer aktiven Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen widerrufen.",
  },
  {
    title: "4. Ihre Wahl",
    body: "Beim ersten Besuch unserer Website können Sie wählen, ob Sie Analyse-Cookies zulassen möchten. Ihre Entscheidung wird lokal in Ihrem Browser gespeichert und kann jederzeit über den Link „Cookie-Einstellungen” im Footer geändert werden.",
  },
]

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-wine hover:text-wine-dark transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl italic text-wine mb-8">Cookie-Richtlinie</h1>

        <div className="prose prose-sm max-w-none text-fig/80 space-y-6">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-xl text-wine mb-2">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
