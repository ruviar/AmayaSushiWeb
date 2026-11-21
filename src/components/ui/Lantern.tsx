"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Chōchin (提灯) de papel encerado iluminado desde dentro.
 *
 * Capas, de atras adelante: halo de luz sobre la pared, cuerpo con
 * sombreado esferico (centro caliente, bordes en penumbra), fibra de
 * papel, costillas de bambu que siguen la curvatura, brillo especular,
 * kanji a pincel y tapas de madera lacada con reflejo. La sombra
 * proyectada la pone un drop-shadow CSS.
 */
export function Lantern({
  kanji = "寿司",
  className,
  delay = 0,
  tone = "shu",
}: {
  kanji?: string;
  className?: string;
  delay?: number;
  tone?: "shu" | "kinu";
}) {
  const id = useId().replace(/:/g, "");
  const chars = [...kanji];

  const c =
    tone === "shu"
      ? { hot: "#ffb070", mid: "#d8482a", base: "#b8311a", edge: "#6e1a0b", rib: "#5a1508", ink: "#1b1512", halo: "#ff8a4c" }
      : { hot: "#fffaf0", mid: "#f6ead2", base: "#e8d5b2", edge: "#b0936a", rib: "#8c7150", ink: "#1b1512", halo: "#ffd9a0" };

  // Cuerpo: elipse 60,128 rx52 ry74 (de y=54 a y=202)
  const CX = 60;
  const CY = 128;
  const RX = 52;
  const RY = 74;
  const ribs = Array.from({ length: 17 }, (_, i) => -64 + i * 8);

  return (
    <div
      className={cn("sway", className)}
      style={{ animationDelay: `${delay}s`, filter: "drop-shadow(0 26px 22px rgba(70, 28, 12, 0.28))" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 270" className="h-full w-full overflow-visible">
        <defs>
          <radialGradient id={`body-${id}`} cx="46%" cy="44%" r="62%">
            <stop offset="0%" stopColor={c.hot} />
            <stop offset="38%" stopColor={c.mid} />
            <stop offset="78%" stopColor={c.base} />
            <stop offset="100%" stopColor={c.edge} />
          </radialGradient>
          <radialGradient id={`halo-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.halo} stopOpacity="0.55" />
            <stop offset="60%" stopColor={c.halo} stopOpacity="0.12" />
            <stop offset="100%" stopColor={c.halo} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`cap-${id}`} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0d0b0a" />
            <stop offset="35%" stopColor="#4a423c" />
            <stop offset="55%" stopColor="#201c19" />
            <stop offset="100%" stopColor="#0d0b0a" />
          </linearGradient>
          <linearGradient id={`spec-${id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`clip-${id}`}>
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} />
          </clipPath>
          <filter id={`paper-${id}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9 0.06" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0" />
          </filter>
          <filter id={`brush-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" />
          </filter>
          <filter id={`blur-${id}`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* halo sobre la pared */}
        <circle className="lantern-glow" cx={CX} cy={CY} r="112" fill={`url(#halo-${id})`} />

        {/* cuerda con nudo y argolla */}
        <line x1={CX} y1="-600" x2={CX} y2="30" stroke="#2a2420" strokeWidth="1.4" />
        <circle cx={CX} cy="33" r="3.2" fill="none" stroke="#2a2420" strokeWidth="1.6" />

        {/* cuerpo */}
        <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill={`url(#body-${id})`} />
        <g clipPath={`url(#clip-${id})`}>
          {/* fibra del papel */}
          <rect x="0" y="50" width="120" height="160" filter={`url(#paper-${id})`} />
          {/* costillas de bambu: arcos que siguen la esfera */}
          {ribs.map((dy) => {
            const y = CY + dy;
            const half = RX * Math.sqrt(Math.max(0, 1 - (dy / RY) ** 2));
            const sag = 3 + (1 - Math.abs(dy) / RY) * 3;
            return (
              <path
                key={dy}
                d={`M${CX - half} ${y} Q${CX} ${y + sag} ${CX + half} ${y}`}
                fill="none"
                stroke={c.rib}
                strokeWidth="0.9"
                opacity={0.28 + (Math.abs(dy) / RY) * 0.25}
              />
            );
          })}
          {/* penumbra lateral para dar volumen */}
          <ellipse cx={CX + 30} cy={CY + 6} rx="30" ry="78" fill={c.edge} opacity="0.22" filter={`url(#blur-${id})`} />
          {/* brillo especular */}
          <ellipse cx={CX - 22} cy={CY - 14} rx="9" ry="52" fill={`url(#spec-${id})`} filter={`url(#blur-${id})`} />
        </g>

        {/* kanji a pincel */}
        <g filter={`url(#brush-${id})`} opacity="0.92">
          {chars.map((ch, i) => (
            <text
              key={i}
              x={CX}
              y={CY + (i - (chars.length - 1) / 2) * 38 + 13}
              textAnchor="middle"
              style={{ fontFamily: "var(--font-kanji)" }}
              fontWeight="800"
              fontSize="34"
              fill={c.ink}
            >
              {ch}
            </text>
          ))}
        </g>

        {/* tapa superior lacada */}
        <path d="M33 38 h54 a3 3 0 0 1 3 3 v14 a3 3 0 0 1 -3 3 h-54 a3 3 0 0 1 -3 -3 v-14 a3 3 0 0 1 3 -3z" fill={`url(#cap-${id})`} />
        <rect x="30" y="46" width="60" height="2" fill="#000" opacity="0.35" />
        {/* tapa inferior */}
        <path d="M35 198 h50 a3 3 0 0 1 3 3 v11 a3 3 0 0 1 -3 3 h-50 a3 3 0 0 1 -3 -3 v-11 a3 3 0 0 1 3 -3z" fill={`url(#cap-${id})`} />

        {/* borla */}
        <line x1={CX} y1="215" x2={CX} y2="228" stroke="#2a2420" strokeWidth="1.6" />
        <circle cx={CX} cy="230" r="3" fill="#2a2420" />
        <g stroke={tone === "shu" ? "#1b1512" : "#a52f17"} strokeWidth="1.1" strokeLinecap="round">
          {[-5, -3, -1, 1, 3, 5].map((dx) => (
            <line key={dx} x1={CX + dx * 0.4} y1="232" x2={CX + dx} y2="258" />
          ))}
        </g>
      </svg>
    </div>
  );
}
