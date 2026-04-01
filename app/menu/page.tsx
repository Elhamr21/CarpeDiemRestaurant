"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

// Menu images from the original restaurant menus
const menuImages = {
  drinks: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu1-LhnpF67JfkHlZ1FXPdJHWO7c5KQlB0.png",
  starters: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu2-hH4t76R7Qpgs5VDg595i9ts0to036z.png",
  pizza: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu2-hH4t76R7Qpgs5VDg595i9ts0to036z.png",
  pasta: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu2-hH4t76R7Qpgs5VDg595i9ts0to036z.png",
  mains: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu3-bOPVCZtLKCniIQTu1ZNaMCTzZzkx5f.png",
  desserts: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu3-bOPVCZtLKCniIQTu1ZNaMCTzZzkx5f.png",
}

const defaultImage = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/staf1-3zWUz1BroiL5eZjscmUDNpTVVqVyL5.jpeg"

const menuCategories = [
  { id: "starters", label: "Vorspeisen", labelIt: "Antipasti" },
  { id: "pizza", label: "Pizza", labelIt: "Pizza" },
  { id: "pasta", label: "Pasta", labelIt: "Primi" },
  { id: "mains", label: "Hauptgerichte", labelIt: "Secondi" },
  { id: "desserts", label: "Desserts", labelIt: "Dolci" },
  { id: "drinks", label: "Getränke", labelIt: "Bevande" },
]

const menuData = {
  starters: {
    title: "Vorspeisen",
    titleIt: "Antipasti",
    description: "Traditionelle italienische Vorspeisen nach Familienrezepten",
    items: [
      { id: "focaccia", name: "Focaccia", price: "3,90", description: "Mit Olivenöl und Rosmarin" },
      { id: "vitello-tonnato", name: "Vitello Tonnato", price: "14,50", description: "Dünn geschnittenes Kalbsfleisch mit Thunfischsauce und Kapern" },
      { id: "carpaccio", name: "Carpaccio di Manzo", price: "14,50", description: "Hauchdünne Scheiben vom rohen Rinderfilet mit Parmesan und Rucola" },
      { id: "antipasto-carpe-diem", name: "Antipasto Carpe Diem", price: "14,50", description: "Nach Art des Hauses" },
      { id: "verdurino", name: "Antipasto Verdurino", price: "13,50", description: "Gemischtes Gemüse" },
      { id: "caprese", name: "Mozzarella Caprese", price: "13,50", description: "Büffelmozzarella mit Tomatenscheiben und frischem Basilikum" },
      { id: "frutti-di-mare", name: "Antipasto Frutti di Mare", price: "18,00", description: "Erlesener Meeresfrüchtesalat" },
      { id: "caponata", name: "Caponata di Melanzane", price: "11,00", description: "Sizilianisches Auberginengericht in süß-sauer Sauce mit Oliven und Kapern" },
    ]
  },
  pizza: {
    title: "Pizza",
    titleIt: "Pizza",
    description: "Traditionell im Steinofen gebacken mit feinstem Mozzarella",
    items: [
      { id: "margherita", name: "Margherita", price: "9,90", description: "Mit Tomatensauce und Mozzarella" },
      { id: "salerno", name: "Salerno", price: "11,50", description: "Mit Tomatensauce, Mozzarella, Salami" },
      { id: "modena", name: "Modena", price: "11,50", description: "Mit Tomatensauce, Mozzarella und Kochschinken" },
      { id: "milano", name: "Milano", price: "13,50", description: "Mit Tomatensauce, Mozzarella, Spinat und Gorgonzola" },
      { id: "vicenza", name: "Vicenza", price: "13,90", description: "Mit Tomatensauce, Mozzarella, Thunfisch und Zwiebel" },
      { id: "parma", name: "Parma", price: "15,50", description: "Mit Parmaschinken, Rucola, Parmesan" },
      { id: "pisa", name: "Pisa", price: "12,50", description: "Mit Tomatensauce, Mozzarella, gekochtem Rosmarinschinken und frischen Champignons" },
      { id: "roma", name: "Roma", price: "18,50", description: "Mit Tomatensauce, Mozzarella, Scampi und Knoblauch" },
      { id: "bari", name: "Bari", price: "16,00", description: "Mit Tomatensauce, Mozzarella, Lachs und Spinat" },
      { id: "napoli", name: "Napoli", price: "12,50", description: "Mit Tomatensauce, Mozzarella, frischen Tomaten und Basilikum" },
      { id: "potenza", name: "Potenza", price: "13,50", description: "Mit Tomatensauce, Mozzarella und scharfer Salami" },
      { id: "catanzaro", name: "Catanzaro", price: "13,50", description: "Mit Tomatensauce, Mozzarella und gegrilltem Gemüse" },
      { id: "palermo", name: "Palermo", price: "11,50", description: "Mit Tomatensauce, Mozzarella und Sardellenfilets" },
      { id: "elba", name: "Elba", price: "18,00", description: "Mit Tomatensauce, Mozzarella und Meeresfrüchten" },
      { id: "ischia", name: "Ischia", price: "15,50", description: "Mit Tomatensauce, Mozzarella, Salami, gekochtem Schinken, Champignons und Peperoni" },
      { id: "carpe-diem", name: "Carpe Diem", price: "16,00", description: "Mit Tomatensauce, Mozzarella, Parmaschinken und Feigen" },
      { id: "hawaii", name: "Hawaii", price: "12,50", description: "Mit Tomatensauce, Mozzarella, Ananas und gekochtem Schinken" },
    ]
  },
  pasta: {
    title: "Pasta",
    titleIt: "Nudelgerichte",
    description: "Hausgemachte Pasta nach traditionellen Rezepten",
    items: [
      { id: "lasagne", name: "Lasagne - hausgemacht", price: "14,90", description: "Schichtnudeln mit Hackragout, Tomaten-Bechamelsauce und Parmesan im Ofen überbacken" },
      { id: "spaghetti-pomodoro", name: "Spaghetti al Pomodoro", price: "10,90", description: "Mit Tomatensauce" },
      { id: "aglio-olio", name: "Spaghetti Aglio & Olio", price: "11,90", description: "Mit Knoblauch, Olivenöl, Peperoncino" },
      { id: "pesto", name: "Spaghetti al Pesto", price: "12,90", description: "Mit Basilikum, Parmesan, Pinienkernen und Olivenöl" },
      { id: "arrabiata", name: "Penne Arrabiata", price: "11,50", description: "Mit scharfer Tomatensauce und Peperoncino" },
      { id: "calabrese", name: "Penne Calabrese", price: "14,50", description: "Mit Thunfisch, Kapern und Cherrytomaten" },
      { id: "tagliatelle-salmone", name: "Tagliatelle al Salmone", price: "16,50", description: "Mit Lachs in cremiger Currysauce" },
      { id: "linguine-peppino", name: "Linguine Peppino", price: "13,90", description: "Mit Champignons und Zucchinistreifen" },
      { id: "linguine-mare", name: "Linguine Mare", price: "18,00", description: "Mit Meeresfrüchten" },
      { id: "linguine-filetto", name: "Linguine Filetto", price: "17,50", description: "Mit Filetspitzen und roten Zwiebeln in leichter Tomatensauce" },
      { id: "linguine-carpe-diem", name: "Linguine Carpe Diem", price: "18,50", description: "Mit Scampetti und Zucchinistreifen" },
      { id: "ravioli", name: "Ravioli Ricotta e Spinaci", price: "14,90", description: "Hausgemachte Ravioli mit Ricotta-Spinatfüllung in Tomaten- oder Butter-Salbeisauce" },
      { id: "tagliatelle-gamberi", name: "Tagliatelle nere con gamberi", price: "18,50", description: "Schwarze Bandnudeln mit Großgarnelen nach italienischer Art" },
      { id: "gnocchi-forno", name: "Gnocchi al Forno", price: "13,90", description: "Gnocchi aus dem Ofen, überbacken mit Tomate und Mozzarella nach italienischer Art" },
      { id: "gnocchi-tartufo", name: "Gnocchi al Tartufo", price: "18,90", description: "Gefüllt mit Trüffeln und Ziegenkäse in Butter-Salbeisauce" },
    ]
  },
  mains: {
    title: "Hauptgerichte",
    titleIt: "Carne & Pesce",
    description: "Feinste Fleisch- und Fischgerichte aus der Küche unseres Chefs",
    items: [
      { id: "milanese", name: "Scaloppine alla Milanese", price: "19,50", description: "Schweinemedaillons paniert mit Pommes und Gemüse" },
      { id: "gorgonzola", name: "Scaloppine alla Gorgonzola", price: "22,50", description: "Schweinemedaillons in cremiger Gorgonzolasauce" },
      { id: "siciliana", name: "Scaloppine alla Siciliana", price: "22,50", description: "Schweinemedaillons in würziger Tomatensauce mit Sardellenfilets, Kapern und grünen Oliven" },
      { id: "filetto", name: "Filetto di Manzo alla Griglia", price: "31,50", description: "Frisches Arg. Rinderfilet (200g) vom Grill mit Kräuterbutter" },
      { id: "pepe-verde", name: "Filetto di Manzo al Pepe Verde", price: "32,50", description: "Frisches Arg. Rinderfilet (200g) in Pfeffersauce" },
      { id: "fegato-venezia", name: "Fegato Venezia", price: "19,90", description: "Frische Kalbsleber mit Butter und Salbei" },
      { id: "fegato-trento", name: "Fegato Trento", price: "21,50", description: "Frische Kalbsleber mit Apfel und Zwiebeln" },
      { id: "saltimbocca", name: "Saltimbocca alla Romana", price: "26,00", description: "Kalbsmedaillons mit Parmaschinken in Weißwein-Salbeisauce" },
      { id: "scaloppine-limone", name: "Scaloppine al Limone", price: "26,00", description: "Kalbsmedaillons in Zitronensauce" },
      { id: "calamaro-fritti", name: "Anelli di Calamaro fritti", price: "19,50", description: "Frittierte Tintenfischringe mit Remoulade" },
      { id: "calamaro-griglia", name: "Calamaro alla Griglia", price: "20,50", description: "Calamaro im Stück vom Grill, Gemüsebeilage" },
      { id: "salmone-griglia", name: "Salmone alla Griglia", price: "23,90", description: "Frischer Lachs vom Grill, Gemüsebeilage" },
      { id: "salmone-verdure", name: "Salmone Verdure", price: "23,90", description: "Frischer Lachs mit Gemüsestreifen in Currysauce, Tagesbeilage" },
      { id: "scampi-griglia", name: "Scampi alla Griglia", price: "29,50", description: "Fünf Großgarnelen vom Grill" },
      { id: "scampi-forno", name: "Scampi al Forno", price: "31,00", description: "Fünf Großgarnelen aus dem Ofen mit Kräutern, Knoblauch" },
    ]
  },
  desserts: {
    title: "Desserts",
    titleIt: "Dolci",
    description: "Süße Versuchungen zum krönenden Abschluss",
    items: [
      { id: "gelato", name: "Gelato Misto", price: "6,40", description: "Gemischtes Eis" },
      { id: "cassata", name: "Cassata Siciliana", price: "7,50", description: "Eis mit kandierten Früchten" },
      { id: "panna-cotta", name: "Panna Cotta", price: "7,80", description: "Hausgemacht" },
      { id: "tiramisu", name: "Tiramisu", price: "7,80", description: "Hausgemacht nach Originalrezept" },
      { id: "tartufo-calabrese", name: "Tartufo Calabrese", price: "7,80", description: "Schokoladentrüffel-Eis" },
      { id: "tartufo-bergamotto", name: "Tartufo Bergamotto", price: "7,80", description: "Mit Bergamotte-Geschmack" },
    ]
  },
  drinks: {
    title: "Getränke",
    titleIt: "Bevande",
    description: "Erlesene Weine aus Italien, hausgemachte Limonaden und klassische Aperitivi",
    items: [
      { id: "hauswein-weiss", name: "Hauswein aus dem Veneto (weiß)", price: "7,90 / 14,00", description: "0,2l / 0,5l - Trocken aber angenehm fruchtig" },
      { id: "pinot-grigio", name: "Pinot Grigio (Veneto)", price: "8,90 / 17,00 / 27,00", description: "0,2l / 0,5l / 0,75l - Trocken, eigensinnig, typisch" },
      { id: "bianco-custoza", name: "Bianco di Custoza (Veneto)", price: "8,90 / 15,50 / 25,00", description: "0,2l / 0,5l / 0,75l - Trocken, blumig-leicht, geschmackvoll" },
      { id: "gavi", name: "Gavi (Piemonte)", price: "11,50 / 23,00 / 33,50", description: "0,2l / 0,5l / 0,75l - Elite-Wein, trocken, geschmacksintensiv, frisch" },
      { id: "rose", name: "Rosé", price: "9,50 / 17,50 / 28,50", description: "0,2l / 0,5l / 0,75l - Trocken, spritzig, angenehm aromatisch" },
      { id: "lambrusco", name: "Lambrusco (Emilia Romagna)", price: "7,50 / 14,50 / 21,50", description: "0,2l / 0,5l / 0,75l - Lieblich, blumig, fruchtig, perlig" },
      { id: "montepulciano", name: "Montepulciano d'Abruzzo", price: "7,90 / 15,50 / 26,00", description: "0,2l / 0,5l / 0,75l - Trocken, abgerundet, gehaltvoll" },
      { id: "bardolino", name: "Bardolino (Veneto)", price: "8,20 / 16,00 / 28,00", description: "0,2l / 0,5l / 0,75l - Trocken, weich, geschmackvoll, harmonisch" },
      { id: "nero-davola", name: "Nero d'Avola (Sicilia)", price: "8,20 / 16,00 / 28,00", description: "0,2l / 0,5l / 0,75l - Trocken, fruchtig, angenehm, mild" },
      { id: "primitivo", name: "Primitivo di Manduria (Puglia)", price: "9,20 / 18,00 / 28,00", description: "0,2l / 0,5l / 0,75l - Trocken, geschmacksintensiv, beerig" },
      { id: "corvina", name: "Corvina (Veneto)", price: "9,90 / 18,50 / 30,00", description: "0,2l / 0,5l / 0,75l - Trocken, vollmundig, samtig, weich, abgerundet" },
      { id: "prosecco", name: "Prosecco Bellussi Extra Dry", price: "39,00", description: "Flasche 0,75l - Ein Schritt vor dem Champagner" },
      { id: "aperol", name: "Aperol Spritz", price: "8,50", description: "0,2l - Der italienische Klassiker" },
      { id: "limoncello-spritz", name: "Limoncello Spritz", price: "8,50", description: "0,2l - Erfrischend zitronig" },
      { id: "hugo", name: "Hugo Spritz", price: "8,50", description: "0,2l - Mit Holunderblütensirup" },
    ]
  }
}

type MenuItem = {
  id: string
  name: string
  price: string
  description: string
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("pizza")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const currentMenu = menuData[activeCategory as keyof typeof menuData]
  const currentImage = menuImages[activeCategory as keyof typeof menuImages] || defaultImage

  // Find the active item for display purposes
  const activeItemId = hoveredItem || selectedItem
  const activeItem = activeItemId 
    ? currentMenu.items.find(item => item.id === activeItemId) 
    : null

  return (
    <main className="min-h-screen bg-parchment">
      {/* Header */}
      <header className="bg-cream border-b border-travertine sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
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
                Pizzeria
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
      <div className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-terracotta mb-2">
            La Nostra Cucina
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-wine mb-4">
            Speisekarte
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Entdecken Sie unsere vollständige Auswahl an authentischen italienischen Gerichten.
          </p>
        </div>

        {/* Category Tabs - Sticky */}
        <div className="sticky top-[72px] z-30 bg-parchment py-4 -mx-4 px-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id)
                  setSelectedItem(null)
                  setHoveredItem(null)
                }}
                className={cn(
                  "px-4 py-2 md:px-5 md:py-2.5 font-sans text-xs md:text-sm uppercase tracking-wider transition-all duration-300 rounded-lg",
                  activeCategory === category.id
                    ? "bg-wine text-cream shadow-lg"
                    : "bg-cream text-wine hover:bg-wine/10 shadow-md"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT SIDE - Menu List */}
          <div>
            {/* Category Header */}
            <div className="mb-8">
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

            {/* Menu Items List */}
            <div className="space-y-3">
              {currentMenu.items.map((item) => (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl transition-all duration-300 border",
                    selectedItem === item.id
                      ? "bg-wine text-cream border-wine shadow-lg"
                      : hoveredItem === item.id
                      ? "bg-cream border-wine/30 shadow-md"
                      : "bg-cream/50 border-travertine hover:bg-cream"
                  )}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className={cn(
                        "font-serif text-lg transition-colors",
                        selectedItem === item.id ? "text-cream" : "text-wine"
                      )}>
                        {item.name}
                      </h4>
                      <p className={cn(
                        "text-sm mt-1 transition-colors",
                        selectedItem === item.id ? "text-cream/80" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </p>
                    </div>
                    <span className={cn(
                      "font-serif text-lg whitespace-nowrap font-medium transition-colors",
                      selectedItem === item.id ? "text-cream" : "text-terracotta"
                    )}>
                      {item.price} &euro;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - Image Preview */}
          <div className="lg:sticky lg:top-[140px] lg:self-start">
            {/* Mobile: Image appears above */}
            <div className="hidden lg:block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={currentImage}
                  alt={`${currentMenu.title} Menü`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain bg-cream transition-all duration-500"
                  priority
                />
                
                {/* Overlay with active item info */}
                {activeItem && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fig/90 via-fig/60 to-transparent p-8">
                    <div className="text-cream">
                      <p className="font-sans text-xs uppercase tracking-wider text-cream/70 mb-1">
                        Ausgewählt
                      </p>
                      <h4 className="font-serif text-2xl mb-2">{activeItem.name}</h4>
                      <p className="text-cream/80 text-sm mb-2">{activeItem.description}</p>
                      <p className="font-serif text-xl text-saffron">{activeItem.price} &euro;</p>
                    </div>
                  </div>
                )}
                
                {/* Default state - no item selected */}
                {!activeItem && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-fig/70 to-transparent p-8">
                    <div className="text-cream text-center">
                      <p className="font-sans text-sm text-cream/70">
                        Wählen Sie ein Gericht aus der Liste
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Swipeable gallery style */}
            <div className="lg:hidden mb-8">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={currentImage}
                  alt={`${currentMenu.title} Menü`}
                  fill
                  sizes="100vw"
                  className="object-contain bg-cream"
                  priority
                />
              </div>
              {activeItem && (
                <div className="mt-4 p-4 bg-wine text-cream rounded-xl">
                  <h4 className="font-serif text-xl mb-1">{activeItem.name}</h4>
                  <p className="text-cream/80 text-sm mb-2">{activeItem.description}</p>
                  <p className="font-serif text-lg text-saffron">{activeItem.price} &euro;</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="text-sm text-muted-foreground mt-12 text-center italic">
          Alle Preise in Euro inkl. MwSt. Allergene und Zusatzstoffe auf Anfrage.
          <br />
          Alle Pizzen auch als Kinderpizzen erhältlich.
        </p>
      </div>
    </main>
  )
}
