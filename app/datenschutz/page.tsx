import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata = {
  title: "Datenschutz | Carpe Diem",
  description: "Datenschutzerklärung von Carpe Diem Ristorante",
}

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-cream pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-wine hover:text-wine-dark transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl italic text-wine mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-sm max-w-none text-fig/80 space-y-6">
          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">1. Datenschutz auf einen Blick</h2>

            <h3 className="font-semibold text-wine mt-4 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
              identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter
              diesem Text aufgelisteten Datenschutzerklärung.
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
            </p>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie
              dem Abschnitt „Angaben zum Verantwortlichen" in dieser Datenschutzerklärung entnehmen.
            </p>

            <p className="mt-3">
              <strong>Wie erfassen wir Ihre Daten?</strong>
            </p>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um
              Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="mt-3">
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem
              technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenzugriffs). Die Erfassung
              dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            <p className="mt-3">
              <strong>Wofür nutzen wir Ihre Daten?</strong>
            </p>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere
              Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <p className="mt-3">
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
            </p>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
              Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können
              Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter
              bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
              Darüber hinaus haben Sie das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">2. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 className="font-semibold text-wine mt-4 mb-2">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
              Datenschutzerklärung.
            </p>
            <p className="mt-3">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten
              sind Daten, mit denen Sie persönlich identifiziert werden können. Diese Datenschutzerklärung erläutert, welche
              Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mt-2">
              <strong>Carpe Diem - Enoteca Ristorante</strong><br />
              Lichterfelder Ring 129<br />
              12209 Berlin<br />
              Deutschland<br />
              <br />
              Telefon: <a href="tel:+493071136644" className="text-wine hover:text-wine-dark">030 711 36 44</a>
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Dauer der Speicherung von personenbezogenen Daten</h3>
            <p>
              Die Dauer der Speicherung von personenbezogenen Daten richtet sich nach dem jeweiligen Zweck der
              Verarbeitung. Wenn Sie beispielsweise an unserem Newsletter anmelden, werden Ihre Daten solange bei uns
              gespeichert, bis Sie sich vom Newsletter abmelden. Für darüber hinausgehende Speicherungen gelten die
              gesetzlichen Aufbewahrungspflichten.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">3. Datenerfassung auf dieser Website</h2>

            <h3 className="font-semibold text-wine mt-4 mb-2">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
              die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside space-y-1 my-2">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser
              Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Berechtigte Interessen).
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Cookies</h3>
            <p>
              Diese Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die lokal auf Ihrem Rechner
              gespeichert werden. Cookies ermöglichen es uns, Ihre Präferenzen zu speichern und die Benutzerfreundlichkeit
              dieser Website zu verbessern. Die meisten Browser akzeptieren Cookies automatisch. Sie können die Speicherung
              von Cookies jedoch deaktivieren oder Ihren Browser so einstellen, dass er Sie vor dem Speichern von Cookies
              warnt.
            </p>

            <h3 className="font-semibold text-wine mt-4 mb-2">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular
              inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für Fall von
              Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-wine mb-4">4. Ihre Rechte</h2>

            <p>
              Sie haben folgende Rechte in Bezug auf Ihre personenbezogenen Daten:
            </p>
            <ul className="list-disc list-inside space-y-2 my-3">
              <li>
                <strong>Auskunftsrecht:</strong> Sie können jederzeit eine Bestätigung darüber verlangen, ob und welche
                Daten über Sie verarbeitet werden.
              </li>
              <li>
                <strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Löschung:</strong> Sie können unter bestimmten Umständen die Löschung Ihrer Daten
                verlangen.
              </li>
              <li>
                <strong>Recht auf Einschränkung der Verarbeitung:</strong> Sie können die Einschränkung der Verarbeitung
                verlangen.
              </li>
              <li>
                <strong>Widerrufsrecht:</strong> Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft
                widerrufen.
              </li>
              <li>
                <strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Datenschutzbehörde zu beschweren.
              </li>
            </ul>

            <p className="mt-4">
              Um Ihre Rechte geltend zu machen, können Sie uns unter folgender Adresse kontaktieren:
            </p>
            <p className="mt-2">
              <strong>Carpe Diem - Enoteca Ristorante</strong><br />
              Lichterfelder Ring 129<br />
              12209 Berlin<br />
              Deutschland
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
