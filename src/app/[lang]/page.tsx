import { Noren } from "@/components/layout/Noren";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { MobileCta } from "@/components/layout/MobileCta";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Carta } from "@/components/sections/Carta";
import { Rodizio } from "@/components/sections/Rodizio";
import { Espaco } from "@/components/sections/Espaco";
import { Reviews } from "@/components/sections/Reviews";
import { Visita } from "@/components/sections/Visita";
import { dictionaries, type Lang } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Lang;
  const t = dictionaries[lang];

  return (
    <>
      <Noren />
      <Nav lang={lang} />
      <main id="conteudo">
        <Hero lang={lang} />
        <Manifesto t={t.manifesto} />
        <Carta lang={lang} />
        <Rodizio t={t.rodizio} />
        <Espaco t={t.espaco} />
        <Reviews t={t.reviews} lang={lang} />
        <Visita lang={lang} />
      </main>
      <Footer lang={lang} />
      <MobileCta lang={lang} />
    </>
  );
}
