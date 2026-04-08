"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Speisekarte" },
  { href: "#team", label: "Unser Team" },
  { href: "#gallery", label: "Galerie" },
  { href: "#reservation", label: "Reservierung" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-cream/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#home"
          className="flex flex-col items-center group"
        >
          <span className={cn(
            "text-xs uppercase tracking-[0.3em] font-sans font-medium transition-colors duration-300",
            isScrolled ? "text-wine/80" : "text-cream/80"
          )}>
            Enoteca
          </span>
          <span className={cn(
            "font-serif text-2xl md:text-3xl font-semibold italic tracking-wide transition-colors duration-300",
            isScrolled ? "text-wine" : "text-cream"
          )}>
            Carpe Diem
          </span>
          <span className={cn(
            "text-xs uppercase tracking-[0.3em] font-sans font-medium transition-colors duration-300",
            isScrolled ? "text-wine/80" : "text-cream/80"
          )}>
            Ristorante
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-sans text-sm uppercase tracking-wider transition-colors duration-300 group",
                isScrolled ? "text-wine/80 hover:text-wine" : "text-cream/90 hover:text-cream"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                isScrolled ? "bg-terracotta" : "bg-cream"
              )} />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+493071136644"
            className={cn(
              "flex items-center gap-2 transition-colors duration-300",
              isScrolled ? "text-wine/80 hover:text-wine" : "text-cream/90 hover:text-cream"
            )}
          >
            <Phone className="w-4 h-4" />
            <span className="font-sans text-sm">030 711 36 44</span>
          </a>
          <a
            href="https://www.quandoo.de/de/restaurant/carpe-diem-berlin-lichterfelde-3708"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "px-6 py-2.5 font-sans text-sm uppercase tracking-wider transition-all duration-300 rounded-sm",
              isScrolled 
                ? "bg-wine text-cream hover:bg-wine-dark" 
                : "bg-cream/20 text-cream border border-cream/50 hover:bg-cream/30"
            )}
          >
            Reservieren
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "lg:hidden p-2 transition-colors duration-300",
            isScrolled ? "text-wine" : "text-cream"
          )}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[80px] bg-cream/98 backdrop-blur-md transition-all duration-500 z-40",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-serif text-2xl text-wine hover:text-terracotta transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col items-center gap-4 mt-8">
            <a
              href="tel:+493071136644"
              className="flex items-center gap-2 text-wine"
            >
              <Phone className="w-5 h-5" />
              <span className="font-sans">030 711 36 44</span>
            </a>
            <a
              href="https://www.quandoo.de/de/restaurant/carpe-diem-berlin-lichterfelde-3708"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-wine text-cream px-8 py-3 font-sans uppercase tracking-wider hover:bg-wine-dark transition-all duration-300"
            >
              Tisch Reservieren
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
