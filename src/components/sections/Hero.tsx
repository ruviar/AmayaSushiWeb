"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OpenStatus } from "@/components/motion/OpenStatus";
import { Hanko } from "@/components/ui/Hanko";
import { HeroBackdrop, PaintedSun } from "@/components/ui/Backdrop";
import { WaveBand } from "@/components/ui/Deco";
import { Lantern } from "@/components/ui/Lantern";
import { dictionaries, type Lang } from "@/lib/i18n";
import { site } from "@/data/site";

/**
 * Hero en papel washi: texto a la izquierda; a la derecha un sol rojo,
 * la foto en arco de templo, una ventana redonda (marumado) y dos
 * farolillos colgando. Abajo, olas seigaiha. La entrada espera al noren.
 */
export function Hero({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].hero;
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([".mask-line", ".anim-rise", ".anim-pop"], { clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({ paused: true });
      tl.fromTo(".hero-sun", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out" })
        .fromTo(".hero-arch", { clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }, { clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)", duration: 1.3, ease: "expo.inOut" }, "<0.1")
        .fromTo(".hero-arch img", { scale: 1.2 }, { scale: 1, duration: 1.8, ease: "expo.out" }, "<0.2")
        // y: 0 explicito: si no, GSAP lee el translate del CSS como px.
        .fromTo(".mask-line", { yPercent: 110, y: 0 }, { yPercent: 0, duration: 1.1, stagger: 0.1, ease: "expo.out" }, "<")
        .fromTo(".anim-rise", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.07, ease: "expo.out" }, "<0.3")
        .fromTo(".anim-pop", { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.9, stagger: 0.12, ease: "back.out(1.6)" }, "<0.1")
        .fromTo(".hero-lantern", { y: -260 }, { y: 0, duration: 1.4, stagger: 0.15, ease: "elastic.out(1, 0.6)" }, "<");

      const play = () => tl.play();
      if (document.documentElement.classList.contains("noren-seen")) gsap.delayedCall(0.1, play);
      else window.addEventListener("noren:done", play, { once: true });
      const early = gsap.delayedCall(1.1, play);

      gsap.to(".hero-arch-inner", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 1 },
      });

      return () => {
        early.kill();
        window.removeEventListener("noren:done", play);
      };
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate flex flex-col overflow-hidden pt-16 md:pt-20 lg:min-h-[100svh]">
      <HeroBackdrop />

      {/* Rejilla centrada en vertical en el alto libre bajo la barra */}
      <div className="mx-auto grid w-full max-w-[1200px] flex-1 items-center gap-10 px-5 pb-28 pt-10 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-6">
        {/* Texto */}
        <div className="relative z-10">
          <p className="anim-rise eyebrow flex items-center gap-3 text-shu">
            <span className="h-px w-8 bg-shu" />
            {t.eyebrow}
          </p>

          <h1 className="anim-mask mt-6 font-display text-[clamp(2.5rem,4.7vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em]">
            {t.title.map((line, i) => (
              <span key={i} className="-mb-[0.22em] block overflow-hidden pb-[0.22em]">
                <span className="mask-line block">
                  {i === 1 ? (
                    <>
                      {line.replace(/\.$/, "")}
                      <span className="text-shu">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="anim-rise mt-7 max-w-[32rem] text-[1.06rem] leading-relaxed text-ink/80">{t.lead}</p>

          <div className="anim-rise mt-9 flex flex-wrap items-center gap-3">
            <a href={`tel:${site.phone}`} className="btn btn-shu">
              {t.cta}
              <span className="tnum opacity-80">· {site.phoneDisplay}</span>
            </a>
            <a href="#carta" className="btn btn-ghost">
              {t.ctaAlt} →
            </a>
          </div>

          <OpenStatus lang={lang} className="anim-rise mt-8" />
        </div>

        {/* Composicion */}
        <div className="relative mx-auto aspect-[5/6] w-full max-w-[460px] lg:h-[min(70svh,620px)] lg:w-auto lg:max-w-none">
          <PaintedSun className="hero-sun absolute right-[0%] top-[4%] aspect-square w-[80%]" />
          {/* Marco de madera clara alrededor del arco */}
          <div className="hero-arch shape-arch absolute bottom-[4%] left-[14%] h-[84%] w-[58%] overflow-hidden bg-[#d9c7a6] p-[7px] shadow-[0_40px_70px_-30px_rgba(60,30,12,0.55),0_8px_18px_-8px_rgba(60,30,12,0.3)]">
            <div className="shape-arch relative h-full w-full overflow-hidden">
              <div className="hero-arch-inner relative h-[110%] w-full -translate-y-[5%]">
                <Image
                  src="/img/platter-hero.webp"
                  alt="Travessa de sushi e sashimi do Amaya"
                  fill
                  priority
                  sizes="(min-width: 1024px) 300px, 60vw"
                  className="grade object-cover"
                />
              </div>
              {/* luz de ventana sobre la foto */}
              <div className="shape-arch pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,230,190,0.28),transparent_45%,rgba(40,20,10,0.25))] shadow-[inset_0_2px_10px_rgba(40,20,10,0.35)]" />
            </div>
          </div>
          <div className="anim-pop absolute bottom-[2%] right-[4%] aspect-square w-[34%] overflow-hidden rounded-full border-[6px] border-kinu shadow-[0_20px_40px_-18px_rgba(60,30,12,0.6)]">
            <Image src="/img/sashimi.webp" alt="Sashimi do dia" fill sizes="180px" className="object-cover" />
          </div>
          <Hanko className="anim-pop absolute left-[2%] top-[38%] size-16 -rotate-12 md:size-20" />
          <p
            aria-hidden="true"
            className="vertical absolute -left-2 bottom-[6%] hidden font-kanji text-2xl font-extrabold tracking-[0.2em] text-sumi/80 sm:block"
          >
            雨夜寿司
          </p>
        </div>
      </div>

      {/* Olas al pie, fundidas con la seccion siguiente */}
      <WaveBand variant="paper" fade="up" className="absolute inset-x-0 bottom-0 -z-10 h-28" />

      {/* Farolillos colgando bajo la barra de navegacion */}
      <Lantern kanji="寿司" tone="kinu" className="hero-lantern pointer-events-none absolute right-[3%] top-16 hidden h-[150px] w-[67px] md:block md:top-20 md:h-[190px] md:w-[84px]" />
      <Lantern kanji="雨夜" className="hero-lantern pointer-events-none absolute left-[51%] top-20 hidden h-[170px] w-[76px] lg:block" delay={1.2} />
    </section>
  );
}
