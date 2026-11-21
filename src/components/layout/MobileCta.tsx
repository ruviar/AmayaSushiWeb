"use client";

import { useEffect, useState } from "react";
import { dictionaries, type Lang } from "@/lib/i18n";
import { directionsUrl, site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Barra fija en movil: llamar y llegar. Aparece tras dejar atras el hero. */
export function MobileCta({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].mobile;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full bg-sumi/90 p-1.5 shadow-xl backdrop-blur-md transition-transform duration-500 ease-out-soft lg:hidden",
        show ? "translate-y-0" : "translate-y-[150%]"
      )}
    >
      <a href={`tel:${site.phone}`} className="flex items-center justify-center gap-2 rounded-full bg-shu py-3 text-sm font-medium text-kinu">
        {t.call}
      </a>
      <a href={directionsUrl} target="_blank" rel="noopener" className="flex items-center justify-center rounded-full bg-kinu py-3 text-sm font-medium text-sumi">
        {t.go} ↗
      </a>
    </div>
  );
}
