"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { X, ArrowRight } from "lucide-react"

const menuCategories = [
  { id: "starters", label: "Vorspeisen", labelIt: "Antipasti" },
  { id: "pizza", label: "Pizza", labelIt: "Pizza" },
  { id: "pasta", label: "Pasta", labelIt: "Primi" },
  { id: "mains", label: "Hauptgerichte", labelIt: "Secondi" },
  { id: "desserts", label: "Desserts", labelIt: "Dolci" },
]

const menuData = {
  starters: {
    title: "Vorspeisen",
    titleIt: "Antipasti",
    description:
      "Traditionelle italienische Vorspeisen nach Familienrezepten",
    items: [
      {
        id: "focaccia",
        name: "Focaccia",
        nameIt: "Focaccia",
        price: "3,90",
        description: "Mit Olivenöl und Rosmarin",
        image: "https://images.unsplash.com/",
      },
      {
        id: "vitello-tonnato",
        name: "Vitello Tonnato",
        nameIt: "Vitello Tonnato",
        price: "14,50",
        description:
          "Dünn geschnittenes Kalbsfleisch mit Thunfischsauce und Kapern",
        image: "https://images.unsplash.com/",
      },
      {
        id: "carpaccio",
        name: "Carpaccio di Manzo",
        nameIt: "Carpaccio di Manzo",
        price: "14,50",
        description:
          "Hauchdünne Scheiben vom rohen Rinderfilet mit Parmesan und Rucola",
        image: "https://images.unsplash.com/",
      },
      {
        id: "antipasto-carpe-diem",
        name: "Antipasto Carpe Diem",
        nameIt: "Antipasto Carpe Diem",
        price: "14,50",
        description: "Nach Art des Hauses",
        image: "https://images.unsplash.com/",
      },
      {
        id: "caprese",
        name: "Mozzarella Caprese",
        nameIt: "Mozzarella Caprese",
        price: "13,50",
        description:
          "Büffelmozzarella mit Tomatenscheiben und frischem Basilikum",
        image: "https://images.unsplash.com/",
      },
      {
        id: "frutti-di-mare",
        name: "Antipasto Frutti di Mare",
        nameIt: "Antipasto Frutti di Mare",
        price: "18,00",
        description: "Erlesener Meeresfrüchtesalat",
        image: "https://images.unsplash.com/",
      },
    ],
  },

  pizza: {
    title: "Pizza",
    titleIt: "Pizza",
    description:
      "Traditionell im Steinofen gebacken mit feinstem Mozzarella",
    items: [
      {
        id: "margherita",
        name: "Pizza Margherita",
        nameIt: "Margherita",
        price: "9,90",
        description: "Mit Tomatensauce und Mozzarella",
        image: "https://images.unsplash.com/",
      },
      {
        id: "salerno",
        name: "Pizza Salerno",
        nameIt: "Salerno",
        price: "11,50",
        description: "Mit Tomatensauce, Mozzarella, Salami",
        image: "https://images.unsplash.com/",
      },
      {
        id: "parma",
        name: "Pizza Parma",
        nameIt: "Parma",
        price: "15,50",
        description: "Mit Parmaschinken, Rucola, Parmesan",
        image: "https://images.unsplash.com/",
      },
      {
        id: "roma",
        name: "Pizza Roma",
        nameIt: "Roma",
        price: "18,50",
        description: "Mit Scampi und Knoblauch",
        image: "https://images.unsplash.com/",
      },
      {
        id: "carpe-diem-pizza",
        name: "Pizza Carpe Diem",
        nameIt: "Carpe Diem",
        price: "16,00",
        description: "Mit Parmaschinken und Feigen",
        image: "https://images.unsplash.com/",
      },
      {
        id: "elba",
        name: "Pizza Elba",
        nameIt: "Elba",
        price: "18,00",
        description: "Mit Meeresfrüchten",
        image: "https://images.unsplash.com/",
      },
    ],
  },

  pasta: {
    title: "Pasta",
    titleIt: "Primi Piatti",
    description: "Hausgemachte Pasta nach traditionellen Rezepten",
    items: [
      {
        id: "lasagne",
        name: "Lasagne",
        nameIt: "Lasagne - hausgemacht",
        price: "14,90",
        description:
          "Schichtnudeln mit Hackragout, Tomaten-Bechamelsauce",
        image: "https://images.unsplash.com/",
      },
      {
        id: "spaghetti-pomodoro",
        name: "Spaghetti al Pomodoro",
        nameIt: "Spaghetti al Pomodoro",
        price: "10,90",
        description: "Mit Tomatensauce",
        image: "https://images.unsplash.com/",
      },
      {
        id: "aglio-olio",
        name: "Spaghetti Aglio & Olio",
        nameIt: "Spaghetti Aglio & Olio",
        price: "11,90",
        description: "Mit Knoblauch, Olivenöl, Peperoncino",
        image: "https://images.unsplash.com/",
      },
      {
        id: "tagliatelle-salmone",
        name: "Tagliatelle al Salmone",
        nameIt: "Tagliatelle al Salmone",
        price: "16,50",
        description: "Mit Lachs in cremiger Currysauce",
        image: "https://images.unsplash.com/",
      },
      {
        id: "linguine-mare",
        name: "Linguine Mare",
        nameIt: "Linguine Mare",
        price: "18,00",
        description: "Mit Meeresfrüchten",
        image: "https://images.unsplash.com/",
      },
      {
        id: "ravioli",
        name: "Ravioli Ricotta e Spinaci",
        nameIt: "Ravioli Ricotta e Spinaci",
        price: "14,90",
        description:
          "Hausgemachte Ravioli mit Ricotta-Spinatfüllung",
        image: "https://images.unsplash.com/",
      },
    ],
  },

  mains: {
    title: "Hauptgerichte",
    titleIt: "Secondi Piatti",
    description:
      "Feinste Fleisch- und Fischgerichte aus der Küche unseres Chefs",
    items: [
      {
        id: "milanese",
        name: "Scaloppine alla Milanese",
        nameIt: "Scaloppine alla Milanese",
        price: "19,50",
        description:
          "Schweinemedaillons paniert mit Pommes und Gemüse",
        image: "https://images.unsplash.com/",
      },
      {
        id: "filetto",
        name: "Filetto di Manzo",
        nameIt: "Filetto di Manzo alla Griglia",
        price: "31,50",
        description: "Frisches Arg. Rinderfilet (200g) vom Grill",
        image: "https://images.unsplash.com/",
      },
      {
        id: "saltimbocca",
        name: "Saltimbocca alla Romana",
        nameIt: "Saltimbocca alla Romana",
        price: "26,00",
        description:
          "Kalbsmedaillons mit Parmaschinken in Weißwein-Salbeisauce",
        image: "https://images.unsplash.com/",
      },
      {
        id: "salmone",
        name: "Salmone alla Griglia",
        nameIt: "Salmone alla Griglia",
        price: "23,90",
        description:
          "Frischer Lachs vom Grill mit Gemüsebeilage",
        image: "https://images.unsplash.com/",
      },
      {
        id: "scampi",
        name: "Scampi alla Griglia",
        nameIt: "Scampi alla Griglia",
        price: "29,50",
        description: "Fünf Großgarnelen vom Grill",
        image: "https://images.unsplash.com/",
      },
      {
        id: "fegato",
        name: "Fegato Venezia",
        nameIt: "Fegato Venezia",
        price: "19,90",
        description:
          "Frische Kalbsleber mit Butter und Salbei",
        image: "https://images.unsplash.com/",
      },
    ],
  },

  desserts: {
    title: "Desserts",
    titleIt: "Dolci",
    description:
      "Süße Versuchungen zum krönenden Abschluss",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu",
        nameIt: "Tiramisu",
        price: "7,80",
        description: "Hausgemacht nach Originalrezept",
        image: "https://images.unsplash.com/",
      },
      {
        id: "panna-cotta",
        name: "Panna Cotta",
        nameIt: "Panna Cotta",
        price: "7,80",
        description: "Hausgemacht mit Beerensauce",
        image: "https://images.unsplash.com/",
      },
      {
        id: "gelato",
        name: "Gelato Misto",
        nameIt: "Gelato Misto",
        price: "6,40",
        description: "Gemischtes Eis",
        image: "https://images.unsplash.com/",
      },
      {
        id: "cassata",
        name: "Cassata Siciliana",
        nameIt: "Cassata Siciliana",
        price: "7,50",
        description: "Eis mit kandierten Früchten",
        image: "https://images.unsplash.com/",
      },
      {
        id: "tartufo",
        name: "Tartufo Calabrese",
        nameIt: "Tartufo Calabrese",
        price: "7,80",
        description: "Schokoladentrüffel-Eis",
        image: "https://images.unsplash.com/",
      },
      {
        id: "creme-brulee",
        name: "Crème Brûlée",
        nameIt: "Crème Brûlée",
        price: "6,90",
        description: "Klassisch karamellisiert",
        image: "https://images.unsplash.com/",
      },
    ],
  },
}

type MenuItem = {
  id: string
  name: string
  nameIt: string
  price: string
  description: string
  image: string
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("pizza")
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)

  const currentMenu = menuData[activeCategory as keyof typeof menuData]

  const openDishModal = (item: MenuItem) => setSelectedDish(item)
  const closeDishModal = () => setSelectedDish(null)

  return (
    <section id="menu" className="py-24 bg-parchment">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            La Nostra Cucina
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Speisekarte
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Entdecken Sie unsere Auswahl an authentischen italienischen Gerichten
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 md:px-6 md:py-3 font-sans text-xs md:text-sm uppercase tracking-wider rounded-lg",
                activeCategory === category.id
                  ? "bg-wine text-cream"
                  : "bg-cream text-wine"
              )}
            >
              <span>{category.label}</span>
              <span className="block text-[10px] md:text-xs opacity-70 italic">
                {category.labelIt}
              </span>
            </button>
          ))}
        </div>

        {/* CATEGORY TITLE */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl text-wine mb-2">
            {currentMenu.title}
          </h3>
          <p className="font-serif text-xl text-terracotta italic mb-2">
            {currentMenu.titleIt}
          </p>
          <p className="text-muted-foreground">
            {currentMenu.description}
          </p>
        </div>

        {/* MENU CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMenu.items.map((item) => (
            <button
              key={item.id}
              className="w-full min-w-0 bg-cream rounded-xl p-5 text-left border border-transparent"
            >
              <div className="flex justify-between items-start gap-3 mb-2">
                <div className="min-w-0">
                  <h4 className="font-serif text-lg text-wine break-words">
                    {item.name}
                  </h4>
                  <p className="font-serif text-sm text-terracotta italic break-words">
                    {item.nameIt}
                  </p>
                </div>

                <span className="shrink-0 font-serif text-xl text-wine whitespace-nowrap font-medium">
                  {item.price} €
                </span>
              </div>

              <p className="text-sm text-muted-foreground break-words">
                {item.description}
              </p>
            </button>
          ))}
        </div>

        {/* LINK */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-wine text-cream px-8 py-4 rounded-lg font-sans uppercase tracking-wider text-sm"
          >
            Vollständige Speisekarte
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* MODAL */}
      {selectedDish && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeDishModal}
        >
          <div
            className="bg-cream rounded-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <button onClick={closeDishModal} className="float-right">
                <X />
              </button>

              <h3 className="text-2xl text-wine mb-2">
                {selectedDish.name}
              </h3>

              <p className="text-terracotta italic mb-2">
                {selectedDish.nameIt}
              </p>

              <p className="text-muted-foreground mb-4">
                {selectedDish.description}
              </p>

              <div className="text-xl text-wine font-bold">
                {selectedDish.price} €
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
