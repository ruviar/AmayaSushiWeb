import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Enso } from "@/components/ui/Deco";
import { site } from "@/data/site";
import type { Dict, Lang } from "@/lib/i18n";

const MAPS_REVIEWS = "https://maps.app.goo.gl/PoyAdt9ydE2omoG8A";

/**
 * Puntuacion real de Google dentro de un enso, y tres extractos cortos
 * de reseñas publicas (en portugues original). TODO(dueño): elegir cuales.
 */
export function Reviews({ t, lang }: { t: Dict["reviews"]; lang: Lang }) {
  const decimal = lang === "en" ? "." : ",";
  return (
    <section className="relative bg-washi">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-24">
        <Reveal className="flex flex-col items-center text-center">
          <SectionLabel index={t.index} label={t.label} center className="anim-rise" />
          <div className="anim-rise relative mt-6 flex size-48 items-center justify-center md:size-56">
            <Enso className="absolute inset-0 h-full w-full text-shu" />
            <p className="font-display text-[4.4rem] leading-none tracking-[-0.03em] md:text-[5.2rem]">
              <CountUp to={site.rating.value} decimals={1} decimal={decimal} />
            </p>
          </div>
          <p className="anim-rise mt-3 text-mist">
            <span className="text-lantern">★★★★</span>
            <span className="text-line">★</span>
            <span className="tnum ml-2 text-sumi">{site.rating.count}</span> {t.count}
          </p>
        </Reveal>

        <Reveal as="ul" className="mt-12 grid gap-4 md:grid-cols-3">
          {t.quotes.map((r, i) => (
            <li key={i} className="anim-rise flex flex-col justify-between rounded-[1.75rem] border border-line bg-kinu p-7">
              <blockquote lang="pt-PT" className="font-display text-[1.35rem] leading-snug">
                <span className="mb-3 block font-display text-5xl leading-none text-shu">“</span>
                {r.q}
              </blockquote>
              <p className="mt-6 flex items-center gap-2 text-sm text-mist">
                <span className="flex size-7 items-center justify-center rounded-full bg-paper text-xs font-bold text-ink">
                  {r.a.charAt(0)}
                </span>
                {r.a} · Google
              </p>
            </li>
          ))}
        </Reveal>

        <div className="mt-10 text-center">
          <a href={MAPS_REVIEWS} target="_blank" rel="noopener" className="btn btn-ghost">
            {t.more} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
