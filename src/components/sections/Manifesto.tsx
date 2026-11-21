import Image from "next/image";
import { Line, MaskLines, Parallax, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Dict } from "@/lib/i18n";

/** A casa: foto en arco + ventana redonda a la izquierda, texto a la derecha. */
export function Manifesto({ t }: { t: Dict["manifesto"] }) {
  return (
    <section id="casa" className="relative bg-paper">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[460px]">
          <Parallax speed={-6} className="shape-arch relative aspect-[4/5] overflow-hidden bg-washi">
            <Image
              src="/img/interior.webp"
              alt="Sala do Amaya: parede vermelha, jardim vertical e a barra ao fundo"
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              className="grade object-cover"
            />
          </Parallax>
          <div className="absolute -bottom-6 -right-2 aspect-square w-[40%] overflow-hidden rounded-full border-[6px] border-paper shadow-lg md:-right-8">
            <Image src="/img/yakitori.webp" alt="Yakitori na brasa" fill sizes="200px" className="object-cover" />
          </div>
          <p aria-hidden="true" className="vertical absolute -right-9 top-10 hidden font-kanji text-xl font-bold tracking-[0.25em] text-shu lg:block">
            居酒屋
          </p>
        </div>

        <div>
          <SectionLabel index={t.index} label={t.label} />
          <MaskLines className="mt-5">
            <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              <Line>{t.lines.join(" ")}</Line>
            </h2>
          </MaskLines>

          <Reveal className="mt-7 space-y-5 text-[1.04rem] leading-relaxed text-ink/80">
            {t.body.map((p, i) => (
              <p key={i} className="anim-rise">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="dl" className="mt-9 grid grid-cols-3 gap-2 sm:gap-3">
            {t.facts.map((f) => (
              <div key={f.k} className="anim-rise rounded-2xl bg-washi px-2 py-5 text-center sm:px-4">
                <dt className="eyebrow break-words text-[0.6rem] tracking-[0.04em] text-mist sm:text-[0.68rem] sm:tracking-[0.1em]">{f.k}</dt>
                <dd className="mt-2 whitespace-nowrap font-display text-[1.2rem] leading-none sm:text-[1.5rem]">{f.v}</dd>
                <dd className="mt-1.5 text-xs leading-snug text-mist">{f.d}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
