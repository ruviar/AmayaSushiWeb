import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

// TODO(dueño): sustituir por la sesion de fotos definitiva.
// `cap` es el indice del pie de foto en el diccionario.
const SHOTS = [
  { src: "/img/interior.webp", cap: 0, cls: "col-span-2 row-span-2 rounded-[2rem]" },
  { src: "/img/platter-hero.webp", cap: 1, cls: "row-span-2 shape-arch" },
  { src: "/img/sashimi.webp", cap: 1, alt: "Sashimi", cls: "aspect-square h-full w-auto justify-self-center rounded-full", kanji: "刺身" },
  { src: "/img/takeaway-box.webp", cap: 3, cls: "rounded-[2rem]" },
  { src: "/img/rolls-row.webp", cap: 2, cls: "col-span-2 rounded-full" },
  { src: "/img/yakitori.webp", cap: 4, cls: "aspect-square h-full w-auto justify-self-center rounded-full" },
  { src: "/img/yakisoba.webp", cap: 6, cls: "rounded-[2rem]" },
] as const;

/**
 * Galeria en mosaico estatico: arco, circulos, pildora y esquinas suaves.
 * Sin scroll horizontal ni pin.
 */
export function Espaco({ t }: { t: Dict["espaco"] }) {
  return (
    <section id="espaco" className="relative bg-paper">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-xl text-center">
          <SectionLabel index={t.index} label={t.label} center className="anim-rise" />
          <h2 className="anim-rise mt-4 font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.015em]">
            {t.title}
          </h2>
          <p className="anim-rise mt-4 text-ink/75">{t.lead}</p>
        </Reveal>

        <Reveal className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[210px] md:grid-cols-4 md:gap-4">
          {SHOTS.map((s) => (
            <figure key={s.src} className={cn("anim-rise group relative overflow-hidden bg-washi", s.cls)}>
              <Image
                src={s.src}
                alt={"alt" in s ? s.alt : t.captions[s.cap]}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="grade object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
              />
              {"kanji" in s && (
                <span className="absolute inset-0 flex items-center justify-center bg-sumi/25 font-kanji text-3xl font-extrabold text-kinu opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {s.kanji}
                </span>
              )}
              {!s.cls.includes("rounded-full") && (
                <figcaption className="absolute bottom-3 left-3 max-w-[85%] rounded-full bg-kinu/90 px-3 py-1 text-xs text-sumi backdrop-blur-sm">
                  {t.captions[s.cap]}
                </figcaption>
              )}
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
