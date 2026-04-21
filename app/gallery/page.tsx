import type { Metadata } from "next"
import { createMetadata } from "@/lib/seo"
import GalleryPageClient from "./gallery-page-client"

export const metadata: Metadata = createMetadata({
  title: "Galerie",
  description:
    "Impressionen aus dem Carpe Diem Ristorante in Berlin-Lichterfelde: Restaurant, Team, Atmosphäre und italienische Gastfreundschaft.",
  path: "/gallery",
})

export default function GalleryPage() {
  return <GalleryPageClient />
}
