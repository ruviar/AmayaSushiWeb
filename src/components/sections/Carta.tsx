"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { menu, formatPrice, type MenuCategory } from "@/data/menu";
import { dictionaries, type Lang } from "@/lib/i18n";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { NorenBanner, PATTERN } from "@/components/ui/Deco";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const fallbackImage = (c: MenuCategory) => c.items.find((i) => i.image)?.image ?? "/img/rolls-row.webp";
const ALL_IMAGES = [...new Set(menu.flatMap((c) => c.items.map((i) => i.image)).filter(Boolean) as string[])];

/**
 * Carta sobre tinta con olas seigaiha: nunca un negro plano. Cuelga un
 * noren お品書き (oshinagaki, "la carta"). Pestañas en pildora; a la
 * izquierda una ventana redonda cambia de foto segun el plato.
 */
export function Carta({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].carta;
  const [active, setActive] = useState(0);
  const cat = menu[active];
  const [preview, setPreview] = useState(fallbackImage(cat));
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setPreview(fallbackImage(menu[active]));
    const el = list.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(el.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "expo.out" });
  }, [active]);

  const onKeyTabs = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : menu.length - 1)) % menu.length;
    setActive(next);
    document.getElementById(`tab-${menu[next].id}`)?.focus();
  };

  return (
    <section id="carta" className="relative text-washi" style={PATTERN.dark}>
      {/* Luz calida de farol sobre el patron */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(227,166,86,0.16), transparent 70%), radial-gradient(40% 40% at 15% 70%, rgba(194,56,30,0.12), transparent 70%)" }}
      />

      <NorenBanner text="お品書き" className="relative" />

      <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-12 md:px-8 md:pb-24">
        <Reveal className="text-center">
          <SectionLabel index={t.index} label={t.label} center tone="dark" className="anim-rise" />
          <h2 className="anim-rise mt-4 font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.015em]">
            {t.title}
          </h2>
          <p className="anim-rise mt-3 text-sm text-lantern">{t.pending}</p>
        </Reveal>

        <div
          role="tablist"
          aria-label={t.label}
          onKeyDown={onKeyTabs}
          className="mt-10 flex justify-start gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:justify-center"
        >
          {menu.map((c, i) => (
            <button
              key={c.id}
              id={`tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`panel-${c.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-300",
                i === active ? "border-washi bg-washi text-sumi" : "border-ash text-washi/75 hover:border-washi/60 hover:text-washi"
              )}
            >
              <span className={cn("font-kanji text-xs", i === active ? "text-shu" : "text-shu/80")}>{c.kanji}</span>
              {c.label[lang]}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Ventana redonda (marumado) */}
          <div className="relative mx-auto hidden w-full max-w-[400px] lg:sticky lg:top-28 lg:block">
            <div className="relative aspect-square overflow-hidden rounded-full border border-ash bg-ash p-3">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                {ALL_IMAGES.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    sizes="400px"
                    className={cn(
                      "grade object-cover transition-[opacity,transform] duration-700 ease-out-soft",
                      src === preview ? "scale-100 opacity-100" : "scale-110 opacity-0"
                    )}
                  />
                ))}
              </div>
            </div>
            <span className="absolute -right-2 top-6 flex size-16 items-center justify-center rounded-full bg-shu font-kanji text-xl font-bold text-kinu shadow-lg">
              {cat.kanji.slice(0, 2)}
            </span>
            <p className="mt-5 text-center text-sm text-washi/60">{cat.note[lang]}</p>
          </div>

          <div id={`panel-${cat.id}`} role="tabpanel" aria-labelledby={`tab-${cat.id}`}>
            <p className="mb-6 text-center text-washi/65 lg:hidden">{cat.note[lang]}</p>
            <ul ref={list} className="space-y-2">
              {cat.items.map((item) => (
                <li
                  key={item.id}
                  onPointerEnter={() => item.image && setPreview(item.image)}
                  className="group rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-washi/[0.06] md:px-5"
                >
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-[1.3rem] leading-tight md:text-[1.45rem]">{item.name}</h3>
                    {item.tags?.includes("signature") && (
                      <span className="shrink-0 rounded-full bg-shu px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-kinu">
                        {t.tags.signature}
                      </span>
                    )}
                    <span className="leader" aria-hidden="true" />
                    <span className="tnum shrink-0 text-washi/85">{formatPrice(item.price, lang)}</span>
                  </div>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-washi/60">{item.desc[lang]}</p>
                  {(item.pieces || item.tags?.some((x) => x !== "signature")) && (
                    <p className="mt-2 flex flex-wrap gap-2 text-xs text-washi/55">
                      {item.pieces && (
                        <span className="tnum rounded-full border border-ash px-2.5 py-0.5">
                          {item.pieces} {t.pieces}
                        </span>
                      )}
                      {item.tags
                        ?.filter((x) => x !== "signature")
                        .map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-2.5 py-0.5",
                              tag === "spicy" ? "border-shu/60 text-[#e8775f]" : "border-matcha text-[#a9b98a]"
                            )}
                          >
                            {t.tags[tag]}
                          </span>
                        ))}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-sm text-washi/55 lg:text-left">{t.full}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
