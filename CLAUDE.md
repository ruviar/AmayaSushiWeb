# Amaya Sushi · Demo web

Demo para el dueño (Gaurav) de Amaya Sushi Bar e Restaurante, Guarda (PT). Brief completo en `MASTER_PROMPT.md`.

## Stack
Next 16 (App Router, SSG) · React 19 · TS 7 · Tailwind 4 (`@theme` en `src/app/globals.css`) · GSAP 3.15 + ScrollTrigger · Lenis.
Mismo patrón que `../ShalomCoffee`.

## Estructura
- `src/app/[lang]/` → layout raíz (html, fuentes, JSON-LD) y página. `/` redirige a `/pt` (`next.config.ts`).
- `src/lib/i18n.ts` → todos los textos PT/EN/ES. `src/data/` → `site.ts` (datos negocio), `hours.ts` (horario + abierto/cerrado), `menu.ts` (carta tipada, lista para fase 2 de pedidos).
- Animaciones: estados iniciales en CSS bajo `.js-motion`; el noren solo sale una vez por sesión (`sessionStorage` `amaya-noren`).
- Fotos: `public/img/*.webp`, sacadas de Google Maps (fotos de clientes). Originales en `_raw/` (ignorado).

## Dirección visual (v2, tras feedback 21/11)
Papel washi claro como base (washi / paper / kinu alternos), tinta sumi, bermellón `shu` de marca, musgo `matcha` (su jardín vertical).
Decoración japonesa en `src/components/ui/Deco.tsx`: olas seigaiha (fondo de secciones oscuras y separadores), farolillos chōchin, noren お品書き sobre la carta, ensō en la puntuación, numerales 壱弐参.
Formas: fotos en arco (`.shape-arch`), ventanas redondas (marumado), píldoras; botones `.btn` redondeados (capa components).
Tipos: Shippori Mincho B1 (titulares) + Zen Kaku Gothic New (todo lo demás). Sin mono.
v3: `ui/Lantern.tsx` (chōchin SVG sombreado), `ui/Backdrop.tsx` (fondo del hero: fibras washi, luz cálida, sombra de bambú, pan de oro; sol pintado). Hero centrado con flex + composición dimensionada por alto en lg.
Ojo con SVG en data URI: escribir `url(#id)` y dejar que `encodeURIComponent` lo codifique; `%23` a mano se doble-codifica y el filtro falla (rectángulo negro).
El usuario rechazó: fondos oscuros vacíos, scroll horizontal, sangrías escalonadas en titulares, esquinas rectas, etiquetas mono.

## TODO con el dueño
- [ ] Teléfono: Google dice 928 259 491, Wanderlog 912 469 839.
- [ ] Precios de la carta (`price: null` → "—") y carta real.
- [ ] Precio rodízio (12,90 € sacado de una reseña) y qué incluye.
- [ ] Fotos propias y logo (en Google aparece un logo caligráfico blanco "Amaya Sushi").
- [ ] Aprobar la lectura 雨夜 del nombre.
- [ ] Permiso para citar las reseñas de Google.
- [ ] Dominio, Instagram, y si quiere pedidos online (fase 2).
- [ ] Quitar `robots: noindex` del layout al publicar.
