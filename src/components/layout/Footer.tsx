import { LiveClock } from "@/components/ui/LiveClock";
import { Hanko } from "@/components/ui/Hanko";
import { PATTERN, WaveBand } from "@/components/ui/Deco";
import { Lantern } from "@/components/ui/Lantern";
import { LangSwitch } from "@/components/layout/Nav";
import { coordsLabel, site } from "@/data/site";
import { dictionaries, type Lang } from "@/lib/i18n";

/** Pie en tinta con olas: la ola roja hace de cenefa, nunca negro plano. */
export function Footer({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].footer;
  return (
    <footer className="relative overflow-hidden text-washi" style={PATTERN.dark}>
      <WaveBand variant="shu" className="h-10" />
      <Lantern kanji="雨夜" className="pointer-events-none absolute left-[6%] top-10 hidden h-[160px] w-[72px] md:block" delay={0.4} />
      <Lantern kanji="寿司" tone="kinu" className="pointer-events-none absolute right-[6%] top-10 hidden h-[130px] w-[60px] md:block" delay={1.4} />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-28 pt-16 text-center md:px-8 lg:pb-12">
        <Hanko className="mx-auto size-16 md:size-20" />
        <p className="mt-6 font-display text-[clamp(3.6rem,14vw,10rem)] font-bold leading-[0.9] tracking-[0.08em]">AMAYA</p>
        <p className="mt-3 font-kanji text-lg tracking-[0.5em] text-washi/50">雨夜 · 寿司バー</p>
        <p className="mx-auto mt-6 max-w-md text-washi/70">{t.tagline}</p>

        <div className="mt-12 grid gap-6 rounded-[2rem] border border-ash bg-sumi/70 p-6 text-sm backdrop-blur-sm md:grid-cols-3 md:text-left">
          <div>
            <p className="text-washi/90">
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
            <p className="tnum mt-1 text-washi/50">{coordsLabel}</p>
          </div>
          <div className="md:text-center">
            <p className="text-washi/50">{t.local}</p>
            <LiveClock className="tnum mt-1 block font-display text-2xl text-washi" />
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a href={site.facebook} target="_blank" rel="noopener" className="btn btn-light !py-2">
              Facebook ↗
            </a>
            <LangSwitch lang={lang} className="border-ash" />
          </div>
        </div>

        <p className="mt-8 text-xs text-washi/40">
          © {new Date().getFullYear()} {site.legalName} · {t.credit}
        </p>
      </div>
    </footer>
  );
}
