import { cn } from "@/lib/utils";

/**
 * Framed product screenshot. Real images live under public/screenshots/.
 * Pass `ready` with a real `src` to render the image; otherwise it shows an
 * in-palette placeholder (labeled with the path to drop in).
 *
 * `natural` shows the full image at its own aspect (used for the big hero shot,
 * so nothing is cropped). Without it, the image cover-crops to `aspect` anchored
 * to the top — keeps a row of secondary shots a uniform height.
 */
export function ScreenshotFrame({
  src,
  alt,
  label,
  ready = false,
  natural = false,
  priority = false,
  className,
  aspect = "16 / 10",
}: {
  src: string;
  alt: string;
  label: string;
  ready?: boolean;
  natural?: boolean;
  priority?: boolean;
  className?: string;
  aspect?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm",
        className,
      )}
    >
      {/* Matte window chrome — three dots, no gloss. */}
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
        <span className="type-micro ml-2 text-muted-foreground">{alt}</span>
      </div>

      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/${src}`}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="block w-full"
          style={
            natural
              ? { height: "auto" }
              : { aspectRatio: aspect, objectFit: "cover", objectPosition: "top" }
          }
        />
      ) : (
        <div
          className="flex flex-col items-center justify-center gap-2 bg-background text-center"
          style={{ aspectRatio: aspect }}
        >
          <span className="type-kicker text-muted-foreground">{label}</span>
          <span className="type-micro font-mono text-muted-foreground">
            drop real shot → public/{src}
          </span>
        </div>
      )}
    </figure>
  );
}
