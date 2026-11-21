import type { Lang } from "@/lib/i18n";

/**
 * Carta de la demo. Platos deducidos de las fotos y reseñas de Google;
 * nombres y precios definitivos los da el dueño.
 *
 * Modelo pensado para la fase 2 (pedidos online): cada plato tiene id
 * estable, precio en centimos y flag de disponibilidad, de modo que el
 * carrito pueda reutilizar este mismo archivo sin migraciones.
 *
 * TODO(dueño): precios. `price: null` se pinta como "—".
 */
export type Localized = Record<Lang, string>;

export type MenuItem = {
  id: string;
  name: string;
  desc: Localized;
  /** Centimos de euro. null = pendiente de confirmar. */
  price: number | null;
  pieces?: number;
  tags?: ("spicy" | "veg" | "signature")[];
  image?: string;
  available: boolean;
};

export type MenuCategory = {
  id: string;
  kanji: string;
  label: Localized;
  note: Localized;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "sushi",
    kanji: "寿司",
    label: { pt: "Sushi & Sashimi", en: "Sushi & Sashimi", es: "Sushi y Sashimi" },
    note: {
      pt: "Peixe cortado no momento, arroz temperado à casa.",
      en: "Fish cut to order, rice seasoned the house way.",
      es: "Pescado cortado al momento, arroz aliñado a la manera de la casa.",
    },
    items: [
      {
        id: "barco-amaya",
        name: "Barco Amaya",
        desc: {
          pt: "A travessa da casa: sashimi, nigiri, uramaki e as peças do dia.",
          en: "The house platter: sashimi, nigiri, uramaki and the pieces of the day.",
          es: "La bandeja de la casa: sashimi, nigiri, uramaki y las piezas del día.",
        },
        price: null,
        pieces: 40,
        tags: ["signature"],
        image: "/img/platter-tall.webp",
        available: true,
      },
      {
        id: "sashimi-salmao",
        name: "Sashimi de salmão",
        desc: {
          pt: "Cortes generosos, servido sobre gelo e shiso.",
          en: "Generous cuts, served on ice and shiso.",
          es: "Cortes generosos, servido sobre hielo y shiso.",
        },
        price: null,
        pieces: 10,
        image: "/img/sashimi.webp",
        available: true,
      },
      {
        id: "uramaki-aburi",
        name: "Uramaki aburi",
        desc: {
          pt: "Salmão maçaricado, maionese japonesa, ovas e cebolinho.",
          en: "Torched salmon, Japanese mayo, roe and chives.",
          es: "Salmón soasado, mayonesa japonesa, huevas y cebollino.",
        },
        price: null,
        pieces: 8,
        tags: ["signature"],
        image: "/img/rolls-row.webp",
        available: true,
      },
      {
        id: "hot-roll",
        name: "Hot roll",
        desc: {
          pt: "Panado e frito na hora, com molho teriyaki.",
          en: "Breaded and fried to order, with teriyaki sauce.",
          es: "Empanado y frito al momento, con salsa teriyaki.",
        },
        price: null,
        pieces: 8,
        available: true,
      },
      {
        id: "gunkan-picante",
        name: "Gunkan picante",
        desc: {
          pt: "Tártaro de salmão com sriracha, envolto em nori.",
          en: "Salmon tartare with sriracha, wrapped in nori.",
          es: "Tartar de salmón con sriracha, envuelto en nori.",
        },
        price: null,
        pieces: 2,
        tags: ["spicy"],
        available: true,
      },
      {
        id: "hossomaki-pepino",
        name: "Hossomaki de pepino",
        desc: {
          pt: "Simples e fresco. Para começar ou para limpar o palato.",
          en: "Simple and fresh. To start, or to clean the palate.",
          es: "Sencillo y fresco. Para empezar o limpiar el paladar.",
        },
        price: null,
        pieces: 8,
        tags: ["veg"],
        available: true,
      },
    ],
  },
  {
    id: "quentes",
    kanji: "居酒屋",
    label: { pt: "Quentes & Izakaya", en: "Hot & Izakaya", es: "Calientes e Izakaya" },
    note: {
      pt: "O que sai da cozinha a fumegar.",
      en: "What leaves the kitchen still steaming.",
      es: "Lo que sale de la cocina humeando.",
    },
    items: [
      {
        id: "gyoza",
        name: "Gyoza",
        desc: {
          pt: "Massa fina, base estaladiça, recheio de porco e legumes.",
          en: "Thin wrapper, crisp base, pork and vegetable filling.",
          es: "Masa fina, base crujiente, relleno de cerdo y verduras.",
        },
        price: null,
        pieces: 5,
        image: "/img/tempura-gyoza.webp",
        available: true,
      },
      {
        id: "ebi-furai",
        name: "Ebi furai",
        desc: {
          pt: "Camarão em panko, molho agridoce.",
          en: "Panko-crusted prawns, sweet and sour sauce.",
          es: "Langostino en panko, salsa agridulce.",
        },
        price: null,
        pieces: 4,
        image: "/img/tempura-gyoza.webp",
        available: true,
      },
      {
        id: "yakitori",
        name: "Yakitori",
        desc: {
          pt: "Espetadas na brasa com tare e sésamo.",
          en: "Grilled skewers glazed with tare and sesame.",
          es: "Brochetas a la brasa con tare y sésamo.",
        },
        price: null,
        pieces: 3,
        image: "/img/yakitori.webp",
        available: true,
      },
      {
        id: "yakisoba",
        name: "Yakisoba",
        desc: {
          pt: "Massa salteada no wok com legumes e molho da casa.",
          en: "Wok-tossed noodles with vegetables and house sauce.",
          es: "Fideos salteados al wok con verduras y salsa de la casa.",
        },
        price: null,
        image: "/img/yakisoba.webp",
        available: true,
      },
      {
        id: "miso",
        name: "Sopa miso",
        desc: {
          pt: "Tofu, wakame e cebolinho. Para as noites frias da Guarda.",
          en: "Tofu, wakame and spring onion. For cold Guarda nights.",
          es: "Tofu, wakame y cebolleta. Para las noches frías de Guarda.",
        },
        price: null,
        tags: ["veg"],
        available: true,
      },
    ],
  },
  {
    id: "thai",
    kanji: "タイ",
    label: { pt: "Cozinha Tailandesa", en: "Thai Kitchen", es: "Cocina Tailandesa" },
    note: {
      pt: "O outro lado da casa: wok, caril e lima.",
      en: "The other side of the house: wok, curry and lime.",
      es: "La otra cara de la casa: wok, curry y lima.",
    },
    items: [
      {
        id: "pad-thai",
        name: "Pad thai",
        desc: {
          pt: "Massa de arroz, tamarindo, amendoim e lima.",
          en: "Rice noodles, tamarind, peanuts and lime.",
          es: "Fideos de arroz, tamarindo, cacahuete y lima.",
        },
        price: null,
        available: true,
      },
      {
        id: "caril-vermelho",
        name: "Caril vermelho",
        desc: {
          pt: "Leite de coco, manjericão tailandês, arroz jasmim.",
          en: "Coconut milk, Thai basil, jasmine rice.",
          es: "Leche de coco, albahaca tailandesa, arroz jazmín.",
        },
        price: null,
        tags: ["spicy"],
        available: true,
      },
      {
        id: "arroz-frito",
        name: "Arroz frito tailandês",
        desc: {
          pt: "Wok bem quente, ovo, legumes e molho de peixe.",
          en: "Smoking-hot wok, egg, vegetables and fish sauce.",
          es: "Wok muy caliente, huevo, verduras y salsa de pescado.",
        },
        price: null,
        available: true,
      },
    ],
  },
];

export function formatPrice(cents: number | null, lang: Lang) {
  if (cents === null) return "—";
  return new Intl.NumberFormat(lang === "en" ? "en-IE" : "pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
