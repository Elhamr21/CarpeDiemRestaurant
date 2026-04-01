"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Maria Schmidt",
    rating: 5,
    comment: "Das beste italienische Restaurant in Berlin! Die Pasta ist hausgemacht und schmeckt wie bei meiner Nonna in Napoli. Das Team ist herzlich und der Service erstklassig.",
    date: "Vor 2 Wochen"
  },
  {
    name: "Thomas Müller",
    rating: 5,
    comment: "Wir kommen seit Jahren hierher und sind jedes Mal begeistert. Die Pizza aus dem Steinofen ist unübertroffen. Ein echtes Stück Italien in Lichterfelde!",
    date: "Vor 1 Monat"
  },
  {
    name: "Anna Weber",
    rating: 5,
    comment: "Perfekt für besondere Anlässe! Die Atmosphäre ist gemütlich und elegant zugleich. Das Tiramisu ist ein Traum - unbedingt probieren!",
    date: "Vor 3 Wochen"
  },
  {
    name: "Michael Fischer",
    rating: 5,
    comment: "Authentische italienische Küche auf höchstem Niveau. Der Wein ist exzellent ausgewählt und das Carpaccio di Manzo ist fantastisch.",
    date: "Vor 1 Woche"
  },
  {
    name: "Julia Becker",
    rating: 5,
    comment: "Ein Geheimtipp! Die Tagesempfehlungen sind immer eine gute Wahl. Das Personal ist freundlich und aufmerksam. Wir kommen wieder!",
    date: "Vor 2 Monaten"
  },
  {
    name: "Stefan Koch",
    rating: 5,
    comment: "Die Scampi alla Griglia sind unglaublich! Frische Zutaten, perfekte Zubereitung. Das Carpe Diem ist unser Lieblingsitaliener geworden.",
    date: "Vor 1 Monat"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-5 h-5 transition-colors",
            star <= rating 
              ? "fill-saffron text-saffron" 
              : "fill-travertine text-travertine"
          )}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-parchment"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            Kundenstimmen
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Was unsere Gäste sagen
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Erfahren Sie, warum unsere Gäste immer wieder zu uns kommen.
          </p>
          
          {/* Overall Rating */}
          <div className="mt-8 inline-flex items-center gap-4 bg-cream px-8 py-4 rounded-xl shadow-lg">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-saffron text-saffron" />
              ))}
            </div>
            <div className="text-left">
              <p className="font-serif text-2xl text-wine font-medium">4.9</p>
              <p className="text-sm text-muted-foreground">Basierend auf 200+ Bewertungen</p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "group bg-cream p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-travertine/50",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              )}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-terracotta/20 mb-4 group-hover:text-terracotta/40 transition-colors duration-300" />
              
              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />
              
              {/* Comment */}
              <p className="mt-4 text-muted-foreground leading-relaxed italic">
                {'"'}{testimonial.comment}{'"'}
              </p>
              
              {/* Author */}
              <div className="mt-6 pt-4 border-t border-travertine/50 flex items-center justify-between">
                <div>
                  <p className="font-serif text-wine font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.date}
                  </p>
                </div>
                <div className="w-10 h-10 bg-wine/10 rounded-full flex items-center justify-center">
                  <span className="font-serif text-wine text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
