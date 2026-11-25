const courses = [
  {
    title: "Vorspeise",
    dishes: [{ name: "Reh-Carpaccio", description: "mit frisch gehobeltem schwarzem Trüffel, Rucola, Parmesan und feinem Olivenöl" }],
  },
  {
    title: "Zwischengang",
    dishes: [{ name: "Rote-Bete-Triangolini", description: "gefüllt mit Wildschwein und Apfel, serviert mit brauner Butter, Thymian und frisch gehobeltem Parmesan" }],
  },
  {
    title: "Hauptgang · zur Wahl",
    dishes: [
      { name: "Rinderfilet an Rotweinjus", description: "mit cremigem Trüffel-Kartoffelpüree und glasiertem Gemüse" },
      { name: "Zanderfilet an Champagnersauce", description: "mit cremigem Trüffel-Kartoffelpüree und saisonalem Gemüse" },
    ],
  },
  {
    title: "Dessert",
    dishes: [{ name: "Schokoladen-Soufflé", description: "mit flüssigem Schokoladenkern, hausgemachtem Vanilleeis und frischer Himbeersauce" }],
  },
]

export function NewYearMenu() {
  return (
    <section id="silvester" aria-labelledby="silvester-title" className="bg-cream px-4 py-16 md:py-24 scroll-mt-24">
      <div className="mx-auto max-w-4xl rounded-lg border border-saffron bg-parchment p-6 text-center shadow-lg sm:p-12">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-terracotta">31. Dezember 2026</p>
        <h2 id="silvester-title" className="font-serif text-4xl text-wine sm:text-6xl">Silvester Gala</h2>
        <p className="mt-4 text-lg text-foreground">Ein festlicher Abend voller Genuss</p>
        <div className="mx-auto my-8 h-px max-w-sm bg-saffron" />
        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course.title}>
              <h3 className="mb-3 font-serif text-2xl text-wine">{course.title}</h3>
              {course.dishes.map((dish, index) => (
                <div key={dish.name}>
                  {index > 0 && <p className="my-3 italic text-muted-foreground">oder</p>}
                  <h4 className="text-lg font-semibold text-foreground">{dish.name}</h4>
                  <p className="mx-auto mt-1 max-w-2xl leading-relaxed text-muted-foreground">{dish.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mx-auto my-8 h-px max-w-sm bg-saffron" />
        <p className="mx-auto max-w-xl italic text-foreground">Wir wünschen Ihnen einen wundervollen Jahresausklang und einen glanzvollen Start ins neue Jahr!</p>
        <p className="mt-8 text-sm uppercase tracking-widest text-terracotta">Menüpreis pro Person</p>
        <p className="mt-2 font-serif text-5xl text-wine">69,90 €</p>
        <a href="/#reservation" className="mt-8 inline-flex rounded-lg bg-wine px-8 py-4 text-cream transition-colors hover:bg-wine-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine">Tisch reservieren</a>
      </div>
    </section>
  )
}
