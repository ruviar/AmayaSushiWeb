"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/data/hours";
import { dictionaries, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Aberto / Fechado contra la hora de Guarda, en una pildora. Se calcula
 * tras hidratar; hasta entonces, esqueleto del mismo tamaño.
 */
export function OpenStatus({ lang, className }: { lang: Lang; className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);
  const t = dictionaries[lang];

  useEffect(() => {
    setState(getOpenState());
    const id = setInterval(() => setState(getOpenState()), 60_000);
    return () => clearInterval(id);
  }, []);

  const label = !state
    ? " "
    : state.open
      ? t.status.open(state.closesAt)
      : state.when === "today"
        ? t.status.closedToday(state.opensAt)
        : state.when === "tomorrow"
          ? t.status.closedTomorrow(state.opensAt)
          : t.status.closedDay(t.days[state.when], state.opensAt);

  return (
    <p
      role="status"
      className={cn(
        "inline-flex min-h-9 min-w-56 items-center gap-2.5 rounded-full border px-4 py-1.5 text-sm",
        !state && "animate-pulse border-line",
        state?.open && "border-matcha/40 bg-matcha/10 text-matcha",
        state && !state.open && "border-line text-mist",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-2 shrink-0 rounded-full", state?.open ? "open-dot bg-matcha" : "bg-mist/50")}
      />
      <span className="tnum">{label}</span>
    </p>
  );
}
