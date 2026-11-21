# MASTER PROMPT — Amaya Sushi (Guarda, PT) · Demo web

## 0. Rol
Actúa como director de arte + front-end senior especializado en hostelería de autor. Construyes una demo web para presentar al dueño de **Amaya Sushi Bar e Restaurante** (Guarda, Portugal). Objetivo: que al abrirla en el móvil diga "esto es mi local, pero mejor". Debe parecer hecha por un estudio humano, no por una IA.

## 1. Datos reales del negocio (no inventar otros)
| Campo | Valor |
|---|---|
| Nombre | Amaya Sushi Bar e Restaurante |
| Dirección | R. Dona Maria das Dores Sampaio 4-10, 6300-687 Guarda, Portugal |
| Coordenadas | 40.5380888, -7.2672752 |
| Teléfono | +351 912 469 839 |
| Horario | Mar–Dom 12:00–15:00 · 19:00–22:30 · **Lunes cerrado** |
| Valoración | Google 4.4 ★ (521 reseñas) · Tripadvisor 4.1 ★ (51) |
| Redes | facebook.com/AmayasushiGuarda (sin Instagram ni web propia) |
| Oferta | Sushi, sashimi, platos mixtos (sashimi de salmón generoso), **rodízio / all-you-can-eat** (fritos, espetadas, sopas), cocina tailandesa (pad thai, caril tailandés), formato izakaya, take-away |
| Dueño | Gaurav, muy valorado por su trato en las reseñas |
| Lo que destacan los clientes | Presentación cuidada, raciones generosas, trato cercano, limpieza, buena relación calidad-precio |

Datos marcados como `TODO` en el código: precio exacto del rodízio, carta completa, fotos reales, logo. **Nunca inventar precios, premios ni citas de reseñas**; usar placeholders explícitos.

## 2. Concepto creativo: "雨夜 · Amaya — la noche de lluvia"
- *Amaya* puede leerse en japonés como **雨夜 (ama-ya) = "noche de lluvia"**. Base narrativa (confirmar con el dueño antes de producción).
- Ambiente: **izakaya escondida en una callejuela**, de las que solo encuentras si alguien te pasa el dato. Guarda es la ciudad más alta de Portugal, fría y con niebla: encaja con el refugio cálido, la luz ámbar detrás de un noren, el asfalto mojado.
- Tono: clandestino pero **elegante y limpio**, nada de cyberpunk ni neón chillón. Lo de "secreto de barrio" va en el copy y la luz, no en efectos de feria.
- Claim de ejemplo (PT): *"Sushi para quem sabe onde procurar."* / ES: *"Sushi para quien sabe dónde buscar."*

## 3. Dirección visual
### Paleta (tokens CSS en `@theme` de Tailwind v4)
| Token | Hex | Uso |
|---|---|---|
| `--sumi` | `#0E0D0C` | Fondo principal (negro tinta, cálido, no #000) |
| `--charcoal` | `#1A1816` | Superficies, secciones alternas |
| `--ash` | `#3A3632` | Bordes, divisores |
| `--washi` | `#EDE6D9` | Texto principal / secciones claras tipo papel |
| `--mist` | `#9C958B` | Texto secundario |
| `--shu` | `#C8371D` | Acento bermellón (sello hanko, CTA). Máx. 5 % de la superficie |
| `--lantern` | `#E0A458` | Luz ámbar: glows, hover, estado "aberto" |
| `--salmon` | `#E9876A` | Uso puntual (detalles de producto) |

Reglas: fondo oscuro dominante; una sola sección clara (washi) para romper el ritmo; el rojo solo en sello, CTA principal y estado activo.

### Tipografía (no usar Inter, Roboto, Poppins ni Space Grotesk)
- Display: **Shippori Mincho B1** (Google Fonts): mincho japonés con latín elegante, en titulares grandes con tracking ajustado.
- Texto: **Switzer** o **General Sans** (Fontshare, self-hosted con `next/font/local`).
- Utilitaria: **JetBrains Mono** en mayúsculas pequeñas para precios, horarios y numeración ("Nº 04", "19:00—22:30"), como un ticket de cocina.
- Kanji decorativos verticales (`writing-mode: vertical-rl`) con moderación: 雨夜, 寿司, 営業中.

### Texturas y detalle
- Grano de película global (SVG noise, opacidad 4–6 %).
- Bordes finos 1px `--ash`, sin sombras difusas ni radios grandes (máx. `rounded-sm`).
- Sello hanko rojo SVG con "雨夜" como firma de marca.
- Fotografía: cálida, contrastada, poca profundidad de campo, mucho negro. Placeholders con `next/image` + blur y un aviso `/* TODO: foto real del local */`.

## 4. Anti-"estética IA" (obligatorio)
Prohibido:
- Degradados morado/azul, glassmorphism, blobs, orbes 3D, glow azul.
- Hero centrado + subtítulo + 2 botones + grid de 3 tarjetas con icono.
- Iconos emoji o de Lucide como decoración principal (solo funcionales: teléfono, mapa).
- Copy genérico: "Eleva tu experiencia", "Descubre", "Sumérgete", "Un viaje de sabores", "Experiencia única". Abuso de guiones largos y tríadas.
- Cards con `rounded-2xl shadow-xl` por todas partes.
- Animaciones en todo: cada animación debe justificarse.

Obligatorio:
- Layout **asimétrico, editorial**, con rejilla de 12 columnas que se rompe a propósito.
- Jerarquía con tamaño y espacio, no con cajas.
- Copy corto, concreto, local (mencionar Guarda, el frío, la Sé, la Serra da Estrela si encaja).
- Microdetalles: numeración de secciones, hora local en vivo, coordenadas en el footer.

## 5. Stack técnico (alineado con ShalomCoffee)
- **Next.js 16** (App Router, RSC, Turbopack) + **React 19** + **TypeScript** estricto.
- **Tailwind CSS v4** (`@theme`, sin `tailwind.config`).
- **GSAP 3.15** (ScrollTrigger, SplitText) para scroll y texto; **Lenis** para scroll suave sincronizado con el ticker de GSAP.
- **Motion** (motion.dev) solo para microinteracciones de componentes (hover, menú, tabs), si hace falta.
- **next-intl**: PT (por defecto), EN, ES.
- **Zod** para validar los datos de la carta.
- SEO: metadata API, `opengraph-image.tsx` dinámico, JSON-LD `Restaurant` (horario, dirección, `servesCuisine`, `menu`, `acceptsReservations`).
- Mapa: embed de Google Maps con carga diferida tras clic (fachada estática estilizada en oscuro) por rendimiento y RGPD.
- Deploy: Vercel.
- `prefers-reduced-motion` respetado en todo; Lighthouse ≥ 95 en móvil.

### Preparado para pedidos online (fase 2)
- Carta en `src/data/menu.ts` tipada: `Category`, `MenuItem { id, slug, name{pt,en,es}, desc, price, allergens[], tags[], image, available }`.
- Componentes de carta desacoplados de la presentación para reutilizarlos en el carrito.
- Dejar previstos (sin implementar): `app/(order)/`, estado de carrito (Zustand), checkout (Stripe / MB WAY vía SIBS o Eupago), panel de cocina. No meter lógica de pago en la demo.

## 6. Estructura de la página (one-page + /menu)
1. **Intro / Noren**: dos paneles de tela (noren) que se abren al cargar (≤1,2 s, saltable). Detrás, el logo con el sello 雨夜.
2. **Hero "callejuela"**: foto/vídeo oscuro del local o placeholder con lluvia sutil (canvas ligero o CSS, desactivable). Titular grande en Shippori a la izquierda, kanji vertical a la derecha. Indicador en vivo **"ABERTO AGORA · fecha às 22:30"** / **"FECHADO · abre amanhã às 12:00"**, calculado con la zona horaria `Europe/Lisbon`.
3. **Manifiesto (01)**: 2–3 frases sobre el sitio escondido, el trato de Gaurav, las raciones. Texto revelado por líneas (SplitText).
4. **La carta (02)**: tabs por categoría (Sushi & Sashimi · Rodízio · Cozinha Tailandesa · Izakaya / Quentes). Lista editorial tipo carta impresa: nombre ··· precio en mono, sin tarjetas. Hover = foto flotante que sigue al cursor (solo desktop).
5. **Rodízio (03)**: bloque destacado en sección clara washi. Precio (`TODO`), qué incluye, horario. CTA "Reservar mesa" → `tel:` / WhatsApp.
6. **O espaço (04)**: galería horizontal con scroll pinneado (GSAP) en desktop y carrusel con snap en móvil.
7. **Reseñas (05)**: puntuación real 4.4 / 521 en Google, con contador animado. Huecos para 3 reseñas reales que se copian de Google con permiso (placeholder, no inventar texto).
8. **Visita (06)**: dirección, horario en tabla mono, teléfono, botón "Como chegar" (deep link a Maps), mapa diferido.
9. **Footer**: sello, coordenadas `40.5380° N · 7.2672° W`, hora local en vivo, Facebook, selector de idioma, crédito del estudio.

Navegación: barra mínima fija que se oculta al bajar y aparece al subir; en móvil, botón flotante "Ligar / Reservar" siempre visible.

## 7. Motion (sobrio)
- Easing propio: `cubic-bezier(0.22, 1, 0.36, 1)`; duraciones de 0,6–1,2 s.
- Reveals por máscara (clip-path), no fades genéricos.
- Parallax leve (≤10 %) solo en imágenes.
- Parpadeo de "luz de farol" solo en el indicador "Aberto", nunca en textos.
- Cursor personalizado opcional (punto ámbar) solo con puntero fino.

## 8. Calidad
- Mobile-first; probar a 360, 390, 768, 1280 y 1920 px.
- Accesibilidad AA: contraste washi/sumi OK, foco visible ámbar, `alt` descriptivos, tabs con ARIA.
- Imágenes AVIF/WebP, fuentes con `display: swap` + preload de la display.
- Sin errores de consola, sin warnings de hidratación.
- `CLAUDE.md` + `DESIGN.md` en la raíz con tokens, decisiones y TODOs.

## 9. Entregable de la demo
- Proyecto en `AmayaSushi/` funcionando con `npm run dev`.
- Lista final de TODOs que pedir al dueño: fotos, logo, carta y precios, precio del rodízio, confirmación de "雨夜", Instagram, interés en pedidos online.
