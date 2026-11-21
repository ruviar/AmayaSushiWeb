import Image from "next/image";
import { Line, MaskLines, Parallax, Reveal } from "@/components/motion/Reveal";
import { Hanko } from "@/components/ui/Hanko";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";
import type { Dict } from "@/lib/i18n";

/** Rodízio en papel: texto y tarjeta de precio a la izquierda, ventana redonda a la derecha. */
export function Rodizio({ t }: { t: Dict["rodizio"] }) {
  return (
    <section id="rodizio" className="relative bg-washi">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionLabel index={t.index} label={t.label} />
          <MaskLines className="mt-5">
            <h2 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              {t.title.map((l, i) => (
                <Line key={i}>{i === 1 ? <span className="text-shu">{l}</span> : l}</Line>
              ))}
            </h2>
          </MaskLines>
          <Reveal>
            <p className="anim-rise mt-6 max-w-md text-[1.04rem] leading-relaxed text-ink/80">{t.lead}</p>

            <div className="anim-rise mt-8 rounded-[1.75rem] border border-line bg-kinu p-6 md:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
                <div>
                  <p className="eyebrow text-mist">{t.from}</p>
                  <p className="mt-1 flex items-start font-display text-[3.6rem] leading-none tracking-[-0.03em]">
                    <span className="tnum">{site.rodizioFrom}</span>
                    <span className="ml-1 mt-1.5 text-[0.45em]">€</span>
                  </p>
                </div>
                <p className="text-sm text-mist">{t.per}</p>
              </div>
              <p className="eyebrow mt-6 text-mist">{t.includes}</p>
              <ul className="mt-3 space-y-2.5">
                {t.list.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="size-2 shrink-0 rounded-full bg-shu" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <a href={`tel:${site.phone}`} className="btn btn-shu">
                  {t.cta}
                </a>
                <p className="max-w-[16rem] text-xs leading-relaxed text-mist">{t.note}</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[480px]">
          {/* Anillo rojo desplazado detras de la ventana redonda */}
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-full border-2 border-shu" />
          <Parallax speed={-5} className="relative aspect-square overflow-hidden rounded-full bg-paper">
            <Image
              src="/img/platter-tall.webp"
              alt="Travessa de rodízio com salmão, nigiri e uramaki"
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="grade object-cover"
            />
          </Parallax>
          <Hanko className="absolute -left-2 top-4 size-20 -rotate-[10deg] drop-shadow-[0_8px_16px_rgba(0,0,0,0.2)] md:size-24" />

          <div className="relative mx-auto -mt-12 flex max-w-[340px] items-center gap-4 rounded-full border border-line bg-kinu p-2 pr-6 shadow-[0_18px_40px_-20px_rgba(27,24,21,0.45)]">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
              <Image src="/img/takeaway-box.webp" alt="Caixa de sushi para levar" fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="font-display text-lg leading-tight">{t.takeaway.title}</p>
              <p className="text-xs leading-snug text-mist">{t.takeaway.body}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
