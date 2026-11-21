"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Contador al entrar al viewport. El HTML ya trae el valor final. */
export function CountUp({ to, decimals = 0, decimal = "," }: { to: number; decimals?: number; decimal?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => n.toFixed(decimals).replace(".", decimal);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: to,
      duration: 1.8,
      ease: "expo.out",
      onUpdate: () => (el.textContent = fmt(obj.v)),
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    el.textContent = fmt(0);
    return () => {
      tween.kill();
      el.textContent = fmt(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return (
    <span ref={ref} className="tnum">
      {fmt(to)}
    </span>
  );
}
