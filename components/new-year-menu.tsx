import Image from "next/image"

export function NewYearMenu() {
  return (
    <section id="silvester" aria-labelledby="silvester-title" className="bg-cream px-4 py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="silvester-title" className="sr-only">Silvester Gala – 31. Dezember 2026</h2>
        <a href="/photos/image.png" target="_blank" rel="noopener noreferrer" aria-label="Silvestermenü in Originalgröße öffnen" className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine">
          <Image
            src="/photos/image.png"
            alt="Silvester Gala am 31. Dezember 2026: Reh-Carpaccio, Rote-Bete-Triangolini, Rinderfilet an Rotweinjus oder Zanderfilet an Champagnersauce und Schokoladen-Soufflé. Menüpreis 69,90 € pro Person."
            width={1030}
            height={1527}
            sizes="(max-width: 928px) calc(100vw - 32px), 896px"
            unoptimized
            className="h-auto w-full"
          />
        </a>
        <a href="/#reservation" className="mt-8 inline-flex rounded-lg bg-wine px-8 py-4 text-cream transition-colors hover:bg-wine-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine">Tisch reservieren</a>
      </div>
    </section>
  )
}
