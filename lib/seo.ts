import type { Metadata } from "next"

const normalizeSiteUrl = (url?: string) => {
  const fallbackUrl = "https://ristorante-carpediem.de"
  const value = url?.trim() || fallbackUrl

  try {
    const parsedUrl = new URL(value)
    return parsedUrl.origin
  } catch {
    return fallbackUrl
  }
}

export const siteConfig = {
  name: "Carpe Diem Ristorante",
  shortName: "Carpe Diem",
  title: "Carpe Diem | Ristorante Italiano in Berlin-Lichterfelde",
  description:
    "Authentische italienische Küche in Berlin-Lichterfelde: hausgemachte Pasta, Pizza aus dem Steinofen, erlesene Weine und Tischreservierung im Carpe Diem Ristorante.",
  url: normalizeSiteUrl(process.env.SITE_URL),
  locale: "de_DE",
  language: "de",
  ogImage: "/photos/cesar.png",
  ogImageAlt: "Carpe Diem Ristorante Logo",
  telephone: "+493071136644",
  email: "contact@ristorante-carpediem.de",
  address: {
    streetAddress: "Lichterfelder Ring 129",
    postalCode: "12209",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  keywords: [
    "Carpe Diem Berlin",
    "Ristorante Carpe Diem",
    "italienisches Restaurant Berlin",
    "italienisches Restaurant Lichterfelde",
    "Pizza Berlin Lichterfelde",
    "Pasta Berlin Lichterfelde",
    "Restaurant Reservierung Berlin",
  ],
}

export const publicRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
]

export const absoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${siteConfig.url}${normalizedPath === "/" ? "" : normalizedPath}`
}

const indexedRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

export const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
}

type CreateMetadataOptions = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.title

  return {
    title: title ?? { absolute: siteConfig.title },
    description,
    alternates: {
      canonical: path,
    },
    robots: noIndex ? noIndexRobots : indexedRobots,
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: image,
          width: 1294,
          height: 810,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  }
}
