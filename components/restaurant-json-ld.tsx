import { absoluteUrl, siteConfig } from "@/lib/seo"

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.ogImage),
  telephone: siteConfig.telephone,
  servesCuisine: ["Italian", "Pizza", "Pasta"],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    ...siteConfig.address,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "12:00",
      closes: "23:00",
    },
  ],
}

export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
    />
  )
}
