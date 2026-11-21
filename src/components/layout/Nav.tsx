"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/ui/Hanko";
import { lockPageScroll, unlockPageScroll } from "@/components/providers/SmoothScroll";
import { dictionaries, LANGS, type Lang } from "@/lib/i18n";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const SECTIONS = ["carta", "rodizio", "espaco", "visita"] as const;

/**
 * Barra minima. Se esconde al bajar y vuelve al subir; sobre el hero es
 * transparente y al despegarse gana fondo tinta.
 */
export function Nav({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].nav;
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 240 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockPageScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      unlockPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-soft",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          solid ? "border-b border-line bg-washi/85 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
          <Link href={`/${lang}`} aria-label="Amaya, início" className="relative z-10">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {SECTIONS.map((s, i) => (
              <li key={s}>
                <a href={`#${s}`} className="group flex items-baseline gap-2 text-[0.92rem] text-ink transition-colors hover:text-shu">
                  <span className="font-kanji text-xs text-shu">{["弐", "参", "四", "六"][i]}</span>
                  <span className="relative">
                    {t[s]}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-shu transition-transform duration-500 ease-out-soft group-hover:scale-x-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <LangSwitch lang={lang} className="hidden md:flex" />
            <a
              href={`tel:${site.phone}`}
              className="btn btn-shu hidden !py-2.5 lg:inline-flex"
            >
              {t.reserve}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 flex items-center gap-3 rounded-full border border-sumi/20 px-4 py-2 text-sm text-sumi lg:hidden"
            >
              {open ? t.close : t.menu}
              <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
                <span className={cn("h-px bg-sumi transition-transform duration-300", open && "translate-y-[3.5px] rotate-45")} />
                <span className={cn("h-px bg-sumi transition-transform duration-300", open && "-translate-y-[3.5px] -rotate-45")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-between bg-washi px-5 pb-10 pt-28 transition-[clip-path] duration-700 ease-out-soft lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-2">
          {SECTIONS.map((s, i) => (
            <li key={s} className="border-b border-line">
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex items-baseline justify-between py-4 font-display text-4xl"
              >
                {t[s]}
                <span className="font-kanji text-lg text-shu">{["弐", "参", "四", "六"][i]}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between">
          <LangSwitch lang={lang} tabbable={open} />
          <a href={`tel:${site.phone}`} tabIndex={open ? 0 : -1} className="btn btn-shu">
            {t.reserve}
          </a>
        </div>
      </div>
    </>
  );
}

export function LangSwitch({ lang, className, tabbable = true }: { lang: Lang; className?: string; tabbable?: boolean }) {
  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium tracking-wider", className)}>
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-line">·</span>}
          <Link
            href={`/${l}`}
            hrefLang={l}
            tabIndex={tabbable ? 0 : -1}
            aria-current={l === lang ? "true" : undefined}
            className={cn("px-0.5 transition-colors", l === lang ? "text-shu" : "text-mist hover:text-sumi")}
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
