"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staf2-limnKWwsj5Rv5gckItw0jTdHzoNrTY.jpeg",
    alt: "Team mit Zitrusfrüchten",
    title: "Frische Zutaten",
    description: "Mediterranes Ambiente mit frischen Zitrusfrüchten"
  },
  {
    src: "/photos/1000028487.jpg",
    alt: "Carpe Diem Team vor dem Restaurant",
    title: "Unsere Geschichte",
    description: "Das Carpe Diem Team vor dem Restaurant"
  },
]

export function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-cream">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            Impressionen
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Galerie
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Erleben Sie die Atmosphäre unseres Restaurants und lernen Sie unser Team kennen.
          </p>
        </div>

        {/* Gallery Images */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto mb-12">
          {galleryImages.map((image, index) => (
            <Link
              key={index}
              href="/gallery"
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-cream translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-serif text-lg">{image.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-wine text-cream px-8 py-4 rounded-lg font-sans uppercase tracking-wider text-sm hover:bg-wine-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Mehr Bilder ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
