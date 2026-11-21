import { cn } from "@/lib/utils";

/* ───────────── Seigaiha (青海波) ─────────────
   Olas concentricas, el patron japones clasico. Cada ola se rellena
   con el color de fondo para tapar la de detras; por eso el patron
   necesita fondo opaco y se genera por variante de color. */
export function seigaiha(fill: string, stroke: string, size = 48) {
  const w = (cx: number, cy: number) =>
    `<g transform='translate(${cx} ${cy})'><circle r='20' fill='${fill}' stroke='${stroke}'/><circle r='15.5' fill='none' stroke='${stroke}'/><circle r='11' fill='none' stroke='${stroke}'/><circle r='6.5' fill='none' stroke='${stroke}'/><circle r='2' fill='none' stroke='${stroke}'/></g>`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'>${w(20, -10)}${w(0, 0)}${w(40, 0)}${w(20, 10)}${w(0, 20)}${w(40, 20)}${w(20, 30)}</svg>`;
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundSize: `${size}px ${size / 2}px`,
  } as const;
}

export const PATTERN = {
  light: seigaiha("#f3ede2", "#ddd1bb"),
  paper: seigaiha("#e9e0cf", "#d6c9b1"),
  dark: seigaiha("#1b1815", "#2a2521"),
  shu: seigaiha("#c2381e", "#d2563e", 40),
};

/** Franja de olas como separador entre secciones. */
export function WaveBand({
  variant = "light",
  className,
  fade = "none",
}: {
  variant?: keyof typeof PATTERN;
  className?: string;
  fade?: "none" | "up" | "down";
}) {
  const mask =
    fade === "up"
      ? "linear-gradient(to top, black 30%, transparent)"
      : fade === "down"
        ? "linear-gradient(to bottom, black 30%, transparent)"
        : undefined;
  return (
    <div
      aria-hidden="true"
      className={cn("h-14 w-full", className)}
      style={{ ...PATTERN[variant], maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

/* ───────────── Ensō (円相) ─────────────
   Circulo de pincel. Se usa para enmarcar la puntuacion. */
export function Enso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M152 40 C 120 14, 60 16, 34 56 C 10 94, 22 150, 66 172 C 112 194, 168 170, 180 120 C 188 88, 176 62, 160 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        style={{ filter: "url(#hanko-ink)" }}
      />
      <path d="M160 50 C 150 44, 146 48, 150 52" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ───────────── Noren (暖簾) ─────────────
   Cortina de tela con kanji que cuelga sobre la carta. */
/**
 * Noren de algodon teñido colgado de una vara de madera.
 * Cada paño lleva presillas sobre la vara, pliegues (degradado), trama
 * del tejido y kanji en reserva (tinte que no ha cogido: borde irregular).
 */
export function NorenBanner({ text, className }: { text: string; className?: string }) {
  const chars = [...text];
  return (
    <div className={cn("relative mx-auto w-fit", className)} aria-hidden="true">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="noren-fold" x1="0" x2="1">
            <stop offset="0%" stopColor="#8f2410" />
            <stop offset="18%" stopColor="#c23a1f" />
            <stop offset="38%" stopColor="#d4472a" />
            <stop offset="55%" stopColor="#b23019" />
            <stop offset="78%" stopColor="#cc4124" />
            <stop offset="100%" stopColor="#922511" />
          </linearGradient>
          <linearGradient id="noren-shade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a0a03" stopOpacity="0.55" />
            <stop offset="16%" stopColor="#2a0a03" stopOpacity="0" />
            <stop offset="85%" stopColor="#2a0a03" stopOpacity="0" />
            <stop offset="100%" stopColor="#2a0a03" stopOpacity="0.3" />
          </linearGradient>
          <filter id="noren-weave" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="1.1 0.9" numOctaves="2" seed="6" />
            <feColorMatrix values="0 0 0 0 0.1  0 0 0 0 0.02  0 0 0 0 0  0 0 0 0.45 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <filter id="noren-dye">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="13" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" />
            <feGaussianBlur stdDeviation="0.25" />
          </filter>
        </defs>
      </svg>

      {/* vara de madera con veta y remates */}
      <div
        className="absolute -left-5 -right-5 top-[3px] z-10 h-3 rounded-full shadow-[0_6px_10px_-4px_rgba(0,0,0,0.7)] md:h-3.5"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(40,20,8,0.12) 0 2px, transparent 2px 9px, rgba(255,230,190,0.06) 9px 11px, transparent 11px 17px), linear-gradient(180deg, #5c3a1f 0%, #b07a48 32%, #8a5a32 55%, #4a2d16 85%, #2e1b0c 100%)",
        }}
      >
        <span className="absolute -left-1 top-1/2 size-4 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#6d4a2c,#1f140c)] md:size-5" />
        <span className="absolute -right-1 top-1/2 size-4 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#6d4a2c,#1f140c)] md:size-5" />
      </div>

      <div className="flex gap-1.5">
        {chars.map((c, i) => (
          <div
            key={i}
            className="sway aspect-[80/134] w-14 md:w-20"
            style={{ animationDelay: `${i * 0.35}s`, animationDuration: "6s", filter: "drop-shadow(0 14px 14px rgba(0,0,0,0.45))" }}
          >
            <svg viewBox="0 0 80 134" className="h-full w-full overflow-visible">
              {/* presillas sobre la vara */}
              {[10, 34, 58].map((x) => (
                <rect key={x} x={x} y="0" width="12" height="16" rx="2" fill="#9e2913" />
              ))}
              {/* paño con bajo ligeramente irregular */}
              <path d="M0 12 H80 V128 Q66 131 52 129 T26 130 T0 128 Z" fill="url(#noren-fold)" />
              <path d="M0 12 H80 V128 Q66 131 52 129 T26 130 T0 128 Z" fill="#000" filter="url(#noren-weave)" />
              <path d="M0 12 H80 V128 Q66 131 52 129 T26 130 T0 128 Z" fill="url(#noren-shade)" />
              {/* dobladillo */}
              <path d="M1 123 Q26 125 52 124 T79 123" fill="none" stroke="#7a1d0c" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
              <text
                x="40"
                y="83"
                textAnchor="middle"
                fontSize="40"
                fontWeight="800"
                fill="#f4ead6"
                filter="url(#noren-dye)"
                style={{ fontFamily: "var(--font-kanji)" }}
              >
                {c}
              </text>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Numeral japones para el folio de seccion. */
export const KANJI_NUM: Record<string, string> = {
  "01": "壱",
  "02": "弐",
  "03": "参",
  "04": "四",
  "05": "伍",
  "06": "六",
};
