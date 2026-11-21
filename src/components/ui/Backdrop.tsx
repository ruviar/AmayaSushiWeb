import { cn } from "@/lib/utils";

/* Fibras de washi: solo las crestas del ruido (umbral en alfa) para que
   no ensucie el papel. Oscuras en multiply, claras (kozo) por encima. */
const FIBERS = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' stitchTiles='stitch' baseFrequency='0.008 0.22' numOctaves='3' seed='3'/><feColorMatrix values='0 0 0 0 0.45  0 0 0 0 0.32  0 0 0 0 0.2  0 0 0 5 -3.1'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>"
)}")`;
const KOZO = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='700' height='700'><filter id='k' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' stitchTiles='stitch' baseFrequency='0.004 0.09' numOctaves='3' seed='21'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.98  0 0 0 0 0.94  0 0 0 6 -3.7'/></filter><rect width='100%' height='100%' filter='url(#k)'/></svg>"
)}")`;
const SPECKS = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='s' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' stitchTiles='stitch' baseFrequency='0.65' numOctaves='1' seed='9'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 9 -7.6'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>"
)}")`;

/** Hoja de bambu como trazo: lanceolada, anclada en (0,0) y apuntando a +x. */
const leaf = (len: number, w: number) => `M0 0 C ${len * 0.25} ${-w}, ${len * 0.7} ${-w * 0.8}, ${len} 0 C ${len * 0.7} ${w * 0.5}, ${len * 0.25} ${w * 0.7}, 0 0Z`;

// [x, y, angulo, largo] sobre la rama. Fijo: nada aleatorio en SSR.
const LEAVES: [number, number, number, number][] = [
  [90, 70, 28, 120], [120, 80, -32, 110], [180, 96, 40, 140], [210, 104, -20, 130],
  [260, 120, 55, 120], [300, 134, -40, 150], [340, 146, 30, 135], [380, 160, -12, 120],
  [420, 172, 48, 110], [450, 182, -30, 125], [500, 196, 20, 105], [520, 204, 70, 90],
  [150, 88, 85, 95], [330, 142, 95, 100],
];

/** Pan de oro (kirikane): escamas pequeñas cerca del sol y del texto. */
const FLAKES: [string, string, number, number][] = [
  ["58%", "18%", 7, 18], ["63%", "26%", 4, -24], ["92%", "30%", 6, 40], ["88%", "64%", 5, 12],
  ["55%", "70%", 4, -30], ["8%", "22%", 5, 22], ["38%", "14%", 3, 60], ["46%", "86%", 6, -10],
  ["71%", "12%", 3, 15], ["96%", "50%", 4, -45], ["30%", "80%", 3, 35], ["66%", "84%", 5, 5],
];

/**
 * Fondo vivo del hero: papel washi con fibras, luz calida de farol,
 * sombra difusa de una rama de bambu que se mece, nubes kasumi doradas
 * como en los biombos y escamas de pan de oro.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {/* base + luz calida arriba a la derecha + viñeta */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 78% 32%, rgba(255,214,160,0.55), transparent 70%), radial-gradient(50% 50% at 10% 90%, rgba(194,56,30,0.07), transparent 70%), radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(92,62,36,0.16) 100%), #f3ede2",
        }}
      />
      {/* fibras y motas del papel */}
      <div className="absolute inset-0 opacity-[0.26] mix-blend-multiply" style={{ backgroundImage: FIBERS }} />
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: KOZO }} />
      <div className="absolute inset-0 opacity-[0.35] mix-blend-multiply" style={{ backgroundImage: SPECKS }} />

      {/* nubes kasumi doradas */}
      {/* elipses difuminadas: sin bordes duros */}
      <div className="absolute left-[42%] top-[54%] h-24 w-[50%] bg-[radial-gradient(closest-side,rgba(230,199,138,0.38),transparent)] blur-md" />
      <div className="absolute left-[58%] top-[64%] h-16 w-[38%] bg-[radial-gradient(closest-side,rgba(230,199,138,0.3),transparent)] blur-md" />
      <div className="absolute left-[-10%] top-[26%] h-20 w-[36%] bg-[radial-gradient(closest-side,rgba(230,199,138,0.26),transparent)] blur-md" />

      {/* sombra de bambu (komorebi) */}
      <svg
        viewBox="0 0 600 320"
        className="leaf-sway absolute -left-[4%] -top-[6%] w-[62vw] max-w-[820px] overflow-visible opacity-[0.13]"
        style={{ filter: "blur(7px)" }}
      >
        <g fill="#3b2614">
          <path d="M-20 40 C 140 70, 300 120, 600 214" fill="none" stroke="#3b2614" strokeWidth="7" />
          <path d="M160 92 C 200 40, 230 10, 260 -20" fill="none" stroke="#3b2614" strokeWidth="4" />
          {LEAVES.map(([x, y, a, l], i) => (
            <path key={i} d={leaf(l, l * 0.13)} transform={`translate(${x} ${y}) rotate(${a})`} />
          ))}
        </g>
      </svg>

      {/* pan de oro */}
      {FLAKES.map(([l, t, s, r], i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: l,
            top: t,
            width: s,
            height: s * 0.8,
            transform: `rotate(${r}deg)`,
            background: "linear-gradient(135deg, #a8823d, #f3dc9b 45%, #c9a45c 60%, #8f6b2c)",
            clipPath: i % 3 === 0 ? "polygon(0 0, 100% 20%, 70% 100%)" : "none",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Sol hinomaru pintado sobre papel: degradado calido, textura de
 * pigmento y borde ligeramente irregular de pincel.
 */
export function PaintedSun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <defs>
        {/* pigmento casi plano: algo mas cargado en el borde, como la tinta al secar */}
        <radialGradient id="sun-fill" cx="50%" cy="48%" r="52%">
          <stop offset="0%" stopColor="#cc4324" />
          <stop offset="80%" stopColor="#c2381e" />
          <stop offset="100%" stopColor="#a92c15" />
        </radialGradient>
        <filter id="sun-edge" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="2" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="9" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="g" />
          <feColorMatrix in="g" values="0 0 0 0 0.25  0 0 0 0 0.05  0 0 0 0 0  0 0 0 0.35 0" result="g2" />
          <feComposite in="g2" in2="d" operator="in" result="tex" />
          <feMerge>
            <feMergeNode in="d" />
            <feMergeNode in="tex" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="200" cy="200" r="188" fill="url(#sun-fill)" filter="url(#sun-edge)" />
    </svg>
  );
}
