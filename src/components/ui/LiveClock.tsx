"use client";

import { useEffect, useState } from "react";
import { guardaNow } from "@/data/hours";

/** Hora local de Guarda. Vacio hasta hidratar para no desajustar el HTML. */
export function LiveClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(guardaNow().label);
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </span>
  );
}
