import { schedule, SCHEMA_DAYS } from "@/data/hours";
import { site } from "@/data/site";
import { dictionaries, htmlLang, type Lang } from "@/lib/i18n";

/** JSON-LD Restaurant. Horario y datos salen de las mismas fuentes que la UI. */
export function buildRestaurantSchema(lang: Lang) {
  const openingHoursSpecification = Object.entries(schedule).flatMap(([day, intervals]) =>
    intervals.map((iv) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAYS[Number(day)],
      opens: iv.from,
      closes: iv.to,
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.legalName,
    description: dictionaries[lang].meta.description,
    inLanguage: htmlLang[lang],
    url: `${site.url}/${lang}`,
    telephone: site.phone,
    image: `${site.url}/img/interior.webp`,
    servesCuisine: ["Japanese", "Sushi", "Thai"],
    priceRange: "€€",
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
    },
    sameAs: [site.facebook],
    openingHoursSpecification,
  };
}
