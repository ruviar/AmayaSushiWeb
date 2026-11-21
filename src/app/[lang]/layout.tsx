import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Shippori_Mincho_B1, Zen_Kaku_Gothic_New } from "next/font/google";

import "../globals.css";

import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { HankoDefs } from "@/components/ui/Hanko";
import { dictionaries, htmlLang, isLang, LANGS } from "@/lib/i18n";
import { buildRestaurantSchema } from "@/lib/schema";
import { site } from "@/data/site";

/* Mincho japones con latin elegante: solo titulares. */
const shippori = Shippori_Mincho_B1({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-shippori",
  display: "swap",
});

/* Gotica japonesa con latin calido: cuerpo, etiquetas y botones.
   Diseñada en Japon, encaja con la mincho sin sonar a terminal. */
const zen = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

/* Los kanji decorativos se piden aparte con `text=`: Google sirve un
   subset de pocos KB solo con esos glifos en vez del CJK completo. */
const KANJI = "雨夜寿司居酒屋タイ店内バーお品書き壱弐参四伍六丸窓提灯営業中刺身";
const kanjiHref = `https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@700;800&display=swap&text=${encodeURIComponent(KANJI)}`;

export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = dictionaries[lang].meta;
  return {
    metadataBase: new URL(site.url),
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "pt-PT": "/pt", en: "/en", es: "/es", "x-default": "/pt" },
    },
    openGraph: {
      type: "website",
      locale: htmlLang[lang].replace("-", "_"),
      siteName: site.legalName,
      title: t.title,
      description: t.description,
      images: [{ url: "/img/interior.webp", width: 1800, height: 1350 }],
    },
    twitter: { card: "summary_large_image" },
    // Demo: no indexar hasta que el dueño apruebe.
    robots: { index: false, follow: false },
  };
}

export const viewport: Viewport = { themeColor: "#f3ede2" };

/* Antes del primer pintado: activa los estados iniciales de animacion y
   salta el noren si ya se vio en esta sesion. */
const BOOT = `(function(){var d=document.documentElement;d.classList.add("js-motion");try{if(sessionStorage.getItem("amaya-noren"))d.classList.add("noren-seen")}catch(e){d.classList.add("noren-seen")}})()`;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html
      lang={htmlLang[lang]}
      suppressHydrationWarning
      className={`${shippori.variable} ${zen.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={kanjiHref} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildRestaurantSchema(lang)) }}
        />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-sumi focus:px-5 focus:py-3 focus:text-sm focus:text-kinu"
        >
          {dictionaries[lang].nav.skip}
        </a>
        <HankoDefs />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
