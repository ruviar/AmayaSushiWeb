"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Hanko } from "@/components/ui/Hanko";

export const NOREN_KEY = "amaya-noren";

/**
 * Entrada: dos paños de noren que se apartan, como al entrar en una izakaya.
 * Solo en la primera visita de la sesion (el flag lo pone el script inline
 * del layout antes de pintar). Clic o tecla lo salta. Menos de 1,6 s.
 */
export function Noren() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el || html.classList.contains("noren-seen")) return;

    const finish = () => {
      try {
        sessionStorage.setItem(NOREN_KEY, "1");
      } catch {}
      html.classList.add("noren-seen");
      window.dispatchEvent(new Event("noren:done"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(".noren-seal", { scale: 0.6, opacity: 0, rotate: -12 }, { scale: 1, opacity: 1, rotate: -4, duration: 0.5, ease: "back.out(2)" })
        .to(".noren-seal", { opacity: 0, scale: 0.9, duration: 0.25, ease: "power2.in" }, "+=0.35")
        .to(".noren-left", { xPercent: -102, skewY: 2, duration: 1, ease: "expo.inOut" }, "<0.05")
        .to(".noren-right", { xPercent: 102, skewY: -2, duration: 1, ease: "expo.inOut" }, "<");

      const skip = () => tl.timeScale(4);
      el.addEventListener("click", skip);
      window.addEventListener("keydown", skip, { once: true });
    }, el);

    return () => ctx.revert();
  }, []);

  const panel =
    "absolute inset-y-0 w-1/2 bg-shu flex items-center justify-center overflow-hidden " +
    "bg-[repeating-linear-gradient(90deg,transparent_0_3px,rgba(255,255,255,0.018)_3px_4px)]";

  return (
    <div ref={root} className="noren fixed inset-0 z-[100] cursor-pointer" aria-hidden="true">
      <div className={`noren-left left-0 border-r border-shu-dark ${panel}`}>
        <span className="font-[family-name:var(--font-kanji)] text-[clamp(7rem,22vw,18rem)] font-extrabold leading-none text-kinu translate-x-[12%]">
          雨
        </span>
        <span className="eyebrow absolute bottom-8 left-8 text-kinu/70">Amaya · Guarda</span>
      </div>
      <div className={`noren-right right-0 border-l border-shu-dark ${panel}`}>
        <span className="font-[family-name:var(--font-kanji)] text-[clamp(7rem,22vw,18rem)] font-extrabold leading-none text-kinu -translate-x-[12%]">
          夜
        </span>
        <span className="eyebrow absolute bottom-8 right-8 text-kinu/70">Sushi bar</span>
      </div>
      <div className="noren-seal absolute left-1/2 top-[18%] -translate-x-1/2 opacity-0">
        <div className="rounded-2xl bg-kinu p-2 shadow-xl">
          <Hanko className="size-16 md:size-20" />
        </div>
      </div>
    </div>
  );
}
