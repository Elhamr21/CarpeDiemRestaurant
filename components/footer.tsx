import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Speisekarte" },
  { href: "#team", label: "Unser Team" },
  { href: "#gallery", label: "Galerie" },
  { href: "#contact", label: "Kontakt" },
]

export function Footer() {
  return (
    <footer className="bg-fig text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-cream/60 mb-1">
                Pizzeria
              </p>
              <h3 className="font-serif text-3xl italic">Carpe Diem</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-cream/60 mt-1">
                Ristorante
              </p>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Authentische italienische Küche in Berlin-Lichterfelde seit 1990.
              Genießen Sie hausgemachte Pasta, traditionelle Pizza und erlesene Weine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/70 hover:text-cream transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  Lichterfelder Ring 129<br />
                  12209 Berlin
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-terracotta shrink-0" />
                <a
                  href="tel:+493071136644"
                  className="text-cream/70 hover:text-cream transition-colors text-sm"
                >
                  030 711 36 44
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm">
                  Mi - So: 12 - 23 Uhr<br />
                  Di: Ruhetag
                </span>
              </li>
            </ul>
          </div>

          {/* Reservation CTA */}
          <div>
            <h4 className="font-serif text-lg mb-6">Reservierung</h4>
            <p className="text-cream/70 text-sm mb-6">
              Reservieren Sie Ihren Tisch online oder telefonisch.
            </p>
            <a
              href="https://www.quandoo.de/de/restaurant/carpe-diem-berlin-lichterfelde-3708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-terracotta text-cream px-6 py-3 font-sans uppercase tracking-wider text-xs hover:bg-terracotta-dark transition-all duration-300 rounded-sm"
            >
              Jetzt reservieren
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-cream/50 text-xs">
              &copy; {new Date().getFullYear()} Carpe Diem - Italienische Spezialitäten. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-cream/50 hover:text-cream/70 text-xs transition-colors"
              >
                Impressum
              </Link>
              <Link
                href="#"
                className="text-cream/50 hover:text-cream/70 text-xs transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
