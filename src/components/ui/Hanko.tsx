import { cn } from "@/lib/utils";

/**
 * Sello hanko 雨夜 (ama-ya, "noche de lluvia"). Firma de marca.
 * El borde irregular sale de un displacement con ruido: un sello real
 * nunca entinta parejo.
 * TODO(dueño): confirmar que le gusta la lectura 雨夜 del nombre.
 */
export function Hanko({ className, title = "雨夜 · Amaya" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={title} className={cn("text-shu", className)}>
      <g filter="url(#hanko-ink)" mask="url(#hanko-wear)">
        <rect x="6" y="6" width="88" height="88" rx="9" fill="currentColor" />
        <rect x="12" y="12" width="76" height="76" rx="5" fill="none" stroke="#ede6d9" strokeWidth="1.6" />
        <text
          x="50"
          y="45"
          textAnchor="middle"
          fontFamily="var(--font-kanji)"
          fontWeight="800"
          fontSize="34"
          fill="#ede6d9"
        >
          雨
        </text>
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fontFamily="var(--font-kanji)"
          fontWeight="800"
          fontSize="34"
          fill="#ede6d9"
        >
          夜
        </text>
      </g>
    </svg>
  );
}

/**
 * Defs compartidos del sello. Se montan una vez en el layout, siempre
 * visibles: si vivieran dentro de un sello oculto (el noren tras cerrarse),
 * algunos navegadores dejarian de resolver el filtro en el resto.
 */
export function HankoDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <filter id="hanko-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
        </filter>
        <mask id="hanko-wear" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="white" />
          <circle cx="0.78" cy="0.22" r="0.016" fill="black" />
          <circle cx="0.24" cy="0.8" r="0.011" fill="black" />
          <circle cx="0.7" cy="0.84" r="0.008" fill="black" />
        </mask>
      </defs>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Hanko className="size-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.15rem] font-bold tracking-[0.32em]">AMAYA</span>
        <span className="eyebrow mt-1 whitespace-nowrap text-[0.55rem] text-mist">Sushi bar · Guarda</span>
      </span>
    </span>
  );
}
