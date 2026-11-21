/**
 * Datos del negocio verificados en la ficha de Google Maps (21/11/2026).
 * Unica fuente: alimenta Visita, el footer, la CTA movil y el JSON-LD.
 *
 * TODO(dueño): Wanderlog lista otro telefono (+351 912 469 839).
 * Confirmar cual es el bueno antes de publicar.
 */
export const site = {
  name: "Amaya",
  legalName: "Amaya Sushi Bar e Restaurante",
  url: "https://amayasushi.pt", // TODO: dominio definitivo
  phone: "+351928259491",
  phoneDisplay: "928 259 491",
  facebook: "https://www.facebook.com/AmayasushiGuarda",
  address: {
    street: "R. Dona Maria das Dores Sampaio 4-10",
    postalCode: "6300-687",
    city: "Guarda",
    country: "PT",
  },
  geo: { lat: 40.5380888, lng: -7.2672752 },
  rating: { value: 4.4, count: 539 },
  // Fuente: reseña publicada en Wanderlog. TODO(dueño): confirmar precio actual.
  rodizioFrom: "12,90",
} as const;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent("Amaya Sushi Bar e Restaurant, Guarda")}&z=17&output=embed`;
export const coordsLabel = "40.5381° N · 7.2673° W";
