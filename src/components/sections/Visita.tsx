"use client";

import { useState } from "react";
import { Hanko } from "@/components/ui/Hanko";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Lantern } from "@/components/ui/Lantern";
import { Line, MaskLines, Reveal } from "@/components/motion/Reveal";
import { OpenStatus } from "@/components/motion/OpenStatus";
import { coordsLabel, directionsUrl, mapsEmbedUrl, site } from "@/data/site";
import { dictionaries, type Lang } from "@/lib/i18n";

export function Visita({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].visita;

  return (
    <section id="visita" className="relative overflow-hidden bg-paper">
      <Lantern kanji="営業" className="pointer-events-none absolute right-[5%] top-0 hidden h-[170px] w-[76px] lg:block" delay={0.6} />

      <div className="mx-auto max-w-[1200px] px-5 py-20 md:px-8 md:py-24">
        <div className="max-w-xl">
          <SectionLabel index={t.index} label={t.label} />
          <MaskLines className="mt-5">
            <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.015em]">
              {t.title.map((l, i) => (
                <Line key={i} className={i === 1 ? "text-shu" : ""}>
                  {l}
                </Line>
              ))}
            </h2>
          </MaskLines>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[2rem] border border-line bg-kinu p-6 md:p-9">
            <dl className="grid gap-8 sm:grid-cols-2">
              <div className="anim-rise">
                <dt className="eyebrow text-mist">{t.address}</dt>
                <dd className="mt-2 text-[1.05rem] leading-snug">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </dd>
                <dd className="mt-2 text-sm text-mist">{t.parking}</dd>
              </div>
              <div className="anim-rise">
                <dt className="eyebrow text-mist">{t.phone}</dt>
                <dd className="mt-2">
                  <a href={`tel:${site.phone}`} className="tnum font-display text-[2rem] leading-none transition-colors hover:text-shu">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="anim-rise mt-8 border-t border-line pt-6">
              <p className="eyebrow text-mist">{t.hours}</p>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="text-xs text-mist">
                    <td />
                    <th scope="col" className="pb-2 text-right font-normal">
                      {t.service[0]}
                    </th>
                    <th scope="col" className="pb-2 pl-5 text-right font-normal">
                      {t.service[1]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.rows.map((r) => (
                    <tr key={r.d} className="border-t border-line">
                      <th scope="row" className="py-3 pr-3 text-left text-[0.95rem] font-normal">
                        {r.d}
                      </th>
                      {r.closed ? (
                        <td colSpan={2} className="py-3 text-right text-mist">
                          {t.closed}
                        </td>
                      ) : (
                        <>
                          <td className="tnum whitespace-nowrap py-3 text-right">12:00–15:00</td>
                          <td className="tnum whitespace-nowrap py-3 pl-5 text-right">19:00–22:30</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <OpenStatus lang={lang} className="mt-5" />
            </div>

            <div className="anim-rise mt-8 flex flex-wrap gap-3">
              <a href={directionsUrl} target="_blank" rel="noopener" className="btn btn-shu">
                {t.directions} ↗
              </a>
              <a href={`tel:${site.phone}`} className="btn btn-ghost">
                {t.call}
              </a>
            </div>
          </Reveal>

          <MapFacade label={t.loadMap} note={t.mapNote} />
        </div>
      </div>
    </section>
  );
}

/**
 * Fachada del mapa: plano dibujado sobre papel hasta que el usuario toca.
 * Solo entonces se carga el iframe de Google (peso y cookies).
 */
function MapFacade({ label, note }: { label: string; note: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className="flex flex-col">
      <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[2rem] border border-line bg-washi">
        {loaded ? (
          <iframe
            title="Mapa · Amaya Sushi, Guarda"
            src={mapsEmbedUrl}
            className="absolute inset-0 h-full w-full [filter:sepia(0.25)_saturate(0.85)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button type="button" onClick={() => setLoaded(true)} className="group absolute inset-0 h-full w-full text-left">
            <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M20 0H0V20" fill="none" stroke="#d8ccb6" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="400" height="400" fill="url(#map-grid)" />
              <g fill="none" stroke="#faf6ee" strokeLinecap="round">
                <path d="M-10 110 C 80 120, 150 160, 230 200 S 360 260, 420 290" strokeWidth="14" />
                <path d="M60 -10 C 90 80, 120 160, 150 230 S 190 380, 200 420" strokeWidth="11" />
                <path d="M300 -10 C 280 90, 250 150, 230 200 S 190 290, 120 380" strokeWidth="9" />
                <path d="M-10 300 C 90 290, 170 270, 260 300 S 380 370, 420 380" strokeWidth="8" />
              </g>
              <g fill="none" stroke="#d8ccb6" strokeLinecap="round">
                <path d="M-10 110 C 80 120, 150 160, 230 200 S 360 260, 420 290" strokeWidth="1" />
                <path d="M60 -10 C 90 80, 120 160, 150 230 S 190 380, 200 420" strokeWidth="1" />
              </g>
              <g fill="#e9e0cf">
                <rect x="250" y="50" width="70" height="48" rx="8" />
                <rect x="30" y="170" width="56" height="70" rx="8" />
                <rect x="270" y="320" width="80" height="54" rx="8" />
              </g>
              <circle cx="230" cy="200" r="70" fill="#c2381e" fillOpacity="0.07" />
              <circle cx="230" cy="200" r="38" fill="#c2381e" fillOpacity="0.1" />
            </svg>
            <span className="absolute left-[57.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out-soft group-hover:scale-110">
              <Hanko className="size-16 -rotate-6" />
            </span>
            <span className="btn btn-light absolute bottom-5 left-5 shadow-md">{label}</span>
            <span className="tnum absolute right-5 top-5 rounded-full bg-kinu/80 px-3 py-1 text-xs text-mist">{coordsLabel}</span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 px-2 text-xs text-mist">{note}</figcaption>
    </figure>
  );
}
