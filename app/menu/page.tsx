import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import MenuPageClient from "./menu-page-client"

export const metadata: Metadata = createMetadata({
  title: "Speisekarte",
  description:
    "Die Speisekarte des Carpe Diem Ristorante in Berlin-Lichterfelde mit Antipasti, Pizza, Pasta, Fleisch- und Fischgerichten, Desserts und Getränken.",
  path: "/menu",
})

export default function MenuPage() {
  return <MenuPageClient />
}
