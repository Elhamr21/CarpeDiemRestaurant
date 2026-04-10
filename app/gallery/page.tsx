"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ArrowLeft } from "lucide-react"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staf2-limnKWwsj5Rv5gckItw0jTdHzoNrTY.jpeg",
    alt: "Frische Zutaten",
    title: "Frische Zutaten",
    description: "Mediterranes Ambiente mit frischen Zitrusfrüchten - ein Stück Italien mitten in Berlin."
  },
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <main 
      className="min-h-screen bg-parchment"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <header className="bg-cream border-b border-travertine">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-2 text-wine hover:text-terracotta transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-sans text-sm uppercase tracking-wider">Zurück</span>
            </Link>
            
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                
              </p>
              <h1 className="font-serif text-2xl text-wine italic">
                Carpe Diem
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
                Ristorante
              </p>
            </div>

            <a
              href="/#reservation"
              className="bg-wine text-cream px-4 py-2 rounded-lg font-sans text-xs uppercase tracking-wider hover:bg-wine-dark transition-colors"
            >
              Reservieren
            </a>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            Impressionen
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Galerie
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Ein konzentrierter Einblick in die frischen Zutaten und das mediterrane
            Gefühl des Carpe Diem.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group text-left bg-cream rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ position: "absolute" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Info */}
              <div className="p-5">
                <h3 className="font-serif text-xl text-wine group-hover:text-terracotta transition-colors mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {image.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-fig/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-cream/80 hover:text-cream p-2 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          {/* Image Container */}
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                fill
                sizes="100vw"
                className="object-contain bg-fig"
                style={{ position: "absolute" }}
              />
            </div>
            
            {/* Caption */}
            <div className="mt-6 text-center text-cream">
              <h3 className="font-serif text-2xl mb-2">
                {galleryImages[selectedImage].title}
              </h3>
              <p className="text-cream/80 max-w-xl mx-auto">
                {galleryImages[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
