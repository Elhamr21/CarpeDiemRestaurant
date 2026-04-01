"use client"

import { useState } from "react"
import Image from "next/image"
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

// Menu data with individual dish images
const menuData = {
  starters: {
    title: "Vorspeisen",
    titleIt: "Antipasti",
    description: "Traditionelle italienische Vorspeisen nach Familienrezepten",
    items: [
      {
        id: "focaccia",
        name: "Focaccia",
        nameIt: "Focaccia",
        price: "3,90",
        description: "Mit Olivenöl und Rosmarin",
        image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop"
      },
      {
        id: "vitello-tonnato",
        name: "Vitello Tonnato",
        nameIt: "Vitello Tonnato",
        price: "14,50",
        description: "Dünn geschnittenes Kalbsfleisch mit Thunfischsauce und Kapern",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
      },
      {
        id: "carpaccio",
        name: "Carpaccio di Manzo",
        nameIt: "Carpaccio di Manzo",
        price: "14,50",
        description: "Hauchdünne Scheiben vom rohen Rinderfilet mit Parmesan und Rucola",
        image: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=400&h=300&fit=crop"
      },
      {
        id: "antipasto-carpe-diem",
        name: "Antipasto Carpe Diem",
        nameIt: "Antipasto Carpe Diem",
        price: "14,50",
        description: "Nach Art des Hauses",
        image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&h=300&fit=crop"
      },
      {
        id: "caprese",
        name: "Mozzarella Caprese",
        nameIt: "Mozzarella Caprese",
        price: "13,50",
        description: "Büffelmozzarella mit Tomatenscheiben und frischem Basilikum",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=300&fit=crop"
      },
      {
        id: "frutti-di-mare",
        name: "Antipasto Frutti di Mare",
        nameIt: "Antipasto Frutti di Mare",
        price: "18,00",
        description: "Erlesener Meeresfrüchtesalat",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop"
      },
    ]
  },
  pizza: {
    title: "Pizza",
    titleIt: "Pizza",
    description: "Traditionell im Steinofen gebacken mit feinstem Mozzarella",
    items: [
      {
        id: "margherita",
        name: "Pizza Margherita",
        nameIt: "Margherita",
        price: "9,90",
        description: "Mit Tomatensauce und Mozzarella",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop"
      },
      {
        id: "salerno",
        name: "Pizza Salerno",
        nameIt: "Salerno",
        price: "11,50",
        description: "Mit Tomatensauce, Mozzarella, Salami",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop"
      },
      {
        id: "parma",
        name: "Pizza Parma",
        nameIt: "Parma",
        price: "15,50",
        description: "Mit Parmaschinken, Rucola, Parmesan",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop"
      },
      {
        id: "roma",
        name: "Pizza Roma",
        nameIt: "Roma",
        price: "18,50",
        description: "Mit Scampi und Knoblauch",
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=300&fit=crop"
      },
      {
        id: "carpe-diem-pizza",
        name: "Pizza Carpe Diem",
        nameIt: "Carpe Diem",
        price: "16,00",
        description: "Mit Parmaschinken und Feigen",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop"
      },
      {
        id: "elba",
        name: "Pizza Elba",
        nameIt: "Elba",
        price: "18,00",
        description: "Mit Meeresfrüchten",
        image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=400&h=300&fit=crop"
      },
    ]
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
        description: "Schichtnudeln mit Hackragout, Tomaten-Bechamelsauce",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop"
      },
      {
        id: "spaghetti-pomodoro",
        name: "Spaghetti al Pomodoro",
        nameIt: "Spaghetti al Pomodoro",
        price: "10,90",
        description: "Mit Tomatensauce",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop"
      },
      {
        id: "aglio-olio",
        name: "Spaghetti Aglio & Olio",
        nameIt: "Spaghetti Aglio & Olio",
        price: "11,90",
        description: "Mit Knoblauch, Olivenöl, Peperoncino",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop"
      },
      {
        id: "tagliatelle-salmone",
        name: "Tagliatelle al Salmone",
        nameIt: "Tagliatelle al Salmone",
        price: "16,50",
        description: "Mit Lachs in cremiger Currysauce",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop"
      },
      {
        id: "linguine-mare",
        name: "Linguine Mare",
        nameIt: "Linguine Mare",
        price: "18,00",
        description: "Mit Meeresfrüchten",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop"
      },
      {
        id: "ravioli",
        name: "Ravioli Ricotta e Spinaci",
        nameIt: "Ravioli Ricotta e Spinaci",
        price: "14,90",
        description: "Hausgemachte Ravioli mit Ricotta-Spinatfüllung",
        image: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=300&fit=crop"
      },
    ]
  },
  mains: {
    title: "Hauptgerichte",
    titleIt: "Secondi Piatti",
    description: "Feinste Fleisch- und Fischgerichte aus der Küche unseres Chefs",
    items: [
      {
        id: "milanese",
        name: "Scaloppine alla Milanese",
        nameIt: "Scaloppine alla Milanese",
        price: "19,50",
        description: "Schweinemedaillons paniert mit Pommes und Gemüse",
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop"
      },
      {
        id: "filetto",
        name: "Filetto di Manzo",
        nameIt: "Filetto di Manzo alla Griglia",
        price: "31,50",
        description: "Frisches Arg. Rinderfilet (200g) vom Grill",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop"
      },
      {
        id: "saltimbocca",
        name: "Saltimbocca alla Romana",
        nameIt: "Saltimbocca alla Romana",
        price: "26,00",
        description: "Kalbsmedaillons mit Parmaschinken in Weißwein-Salbeisauce",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop"
      },
      {
        id: "salmone",
        name: "Salmone alla Griglia",
        nameIt: "Salmone alla Griglia",
        price: "23,90",
        description: "Frischer Lachs vom Grill mit Gemüsebeilage",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
      },
      {
        id: "scampi",
        name: "Scampi alla Griglia",
        nameIt: "Scampi alla Griglia",
        price: "29,50",
        description: "Fünf Großgarnelen vom Grill",
        image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop"
      },
      {
        id: "fegato",
        name: "Fegato Venezia",
        nameIt: "Fegato Venezia",
        price: "19,90",
        description: "Frische Kalbsleber mit Butter und Salbei",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"
      },
    ]
  },
  desserts: {
    title: "Desserts",
    titleIt: "Dolci",
    description: "Süße Versuchungen zum krönenden Abschluss",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu",
        nameIt: "Tiramisu",
        price: "7,80",
        description: "Hausgemacht nach Originalrezept",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop"
      },
      {
        id: "panna-cotta",
        name: "Panna Cotta",
        nameIt: "Panna Cotta",
        price: "7,80",
        description: "Hausgemacht mit Beerensauce",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop"
      },
      {
        id: "gelato",
        name: "Gelato Misto",
        nameIt: "Gelato Misto",
        price: "6,40",
        description: "Gemischtes Eis",
        image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=400&h=300&fit=crop"
      },
      {
        id: "cassata",
        name: "Cassata Siciliana",
        nameIt: "Cassata Siciliana",
        price: "7,50",
        description: "Eis mit kandierten Früchten",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"
      },
      {
        id: "tartufo",
        name: "Tartufo Calabrese",
        nameIt: "Tartufo Calabrese",
        price: "7,80",
        description: "Schokoladentrüffel-Eis",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
      },
      {
        id: "creme-brulee",
        name: "Crème Brûlée",
        nameIt: "Crème Brûlée",
        price: "6,90",
        description: "Klassisch karamellisiert",
        image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&h=300&fit=crop"
      },
    ]
  }
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

  const openDishModal = (item: MenuItem) => {
    setSelectedDish(item)
  }

  const closeDishModal = () => {
    setSelectedDish(null)
  }

  return (
    <section id="menu" className="py-24 bg-parchment">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            La Nostra Cucina
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Speisekarte
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Entdecken Sie unsere Auswahl an authentischen italienischen Gerichten,
            zubereitet mit Leidenschaft und den besten Zutaten.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 md:px-6 md:py-3 font-sans text-xs md:text-sm uppercase tracking-wider transition-all duration-300 rounded-lg",
                activeCategory === category.id
                  ? "bg-wine text-cream shadow-lg"
                  : "bg-cream text-wine hover:bg-wine/10 shadow-md"
              )}
            >
              <span className="block">{category.label}</span>
              <span className="block text-[10px] md:text-xs opacity-70 italic">
                {category.labelIt}
              </span>
            </button>
          ))}
        </div>

        {/* Category Header */}
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

        {/* Menu Grid with Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMenu.items.map((item) => (
            <button
              key={item.id}
              onClick={() => openDishModal(item)}
              className="group bg-cream rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 text-left"
            >
              {/* Dish Image */}
              <div style={{ position: "relative" }} className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-fig/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="bg-cream text-wine px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-5">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div>
                    <h4 className="font-serif text-lg text-foreground group-hover:text-wine transition-colors">
                      {item.name}
                    </h4>
                    <p className="font-serif text-sm text-terracotta italic">
                      {item.nameIt}
                    </p>
                  </div>
                  <span className="font-serif text-xl text-wine whitespace-nowrap font-medium">
                    {item.price} &euro;
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* View Full Menu Link */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-wine text-cream px-8 py-4 rounded-lg font-sans uppercase tracking-wider text-sm hover:bg-wine-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Vollständige Speisekarte
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div
          className="fixed inset-0 z-50 bg-fig/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeDishModal}
        >
          <div
            className="bg-cream rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div style={{ position: "relative" }} className="aspect-[16/9]">
              <Image
                src={selectedDish.image}
                alt={selectedDish.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <button
                onClick={closeDishModal}
                className="absolute top-4 right-4 bg-cream/90 hover:bg-cream text-wine p-2 rounded-full transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fig/80 to-transparent p-6">
                <span className="font-serif text-3xl text-cream font-medium">
                  {selectedDish.price} &euro;
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h3 className="font-serif text-3xl text-wine mb-1">
                {selectedDish.name}
              </h3>
              <p className="font-serif text-xl text-terracotta italic mb-4">
                {selectedDish.nameIt}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {selectedDish.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="flex-1 bg-wine text-cream px-6 py-3 rounded-lg font-sans uppercase tracking-wider text-sm text-center hover:bg-wine-dark transition-all duration-300"
                >
                  Vollständige Speisekarte
                </Link>
                <a
                  href="#reservation"
                  onClick={closeDishModal}
                  className="flex-1 border-2 border-wine text-wine px-6 py-3 rounded-lg font-sans uppercase tracking-wider text-sm text-center hover:bg-wine hover:text-cream transition-all duration-300"
                >
                  Tisch reservieren
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
