import { KANJI_NUM } from "@/components/ui/Deco";
import { cn } from "@/lib/utils";

/**
 * Folio de seccion: numeral japones en un circulo rojo + nombre.
 * `center` lo centra; por defecto alinea a la izquierda.
 */
export function SectionLabel({
  index,
  label,
  className,
  center = false,
  tone = "light",
}: {
  index: string;
  label: string;
  className?: string;
  center?: boolean;
  tone?: "light" | "dark";
}) {
  return (
    <p className={cn("flex items-center gap-3", center && "justify-center", className)}>
      <span className="flex size-8 items-center justify-center rounded-full bg-shu font-kanji text-sm font-bold text-kinu">
        {KANJI_NUM[index] ?? index}
      </span>
      <span className={cn("eyebrow", tone === "dark" ? "text-washi/70" : "text-mist")}>{label}</span>
    </p>
  );
}
