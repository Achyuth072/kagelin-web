import { cn } from "@/lib/utils";

// `ready` renders the real image; otherwise a placeholder. `natural` shows the
// full image at its own aspect; without it, cover-crops to `aspect` from the top.
export function ScreenshotFrame({
  src,
  alt,
  label,
  ready = false,
  natural = false,
  priority = false,
  className,
  aspect = "16 / 10",
  mobileFocus = "center",
}: {
  src: string;
  alt: string;
  label: string;
  ready?: boolean;
  natural?: boolean;
  priority?: boolean;
  className?: string;
  aspect?: string;
  // Horizontal object-position for the mobile crop below. Full-bleed desktop
  // screenshots are unreadable shrunk to card width, so mobile crops to a
  // narrower aspect (full height kept, only sides cropped) and zooms in on
  // whichever part of the shot matters — this points at it.
  mobileFocus?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-secondary px-3.5 py-2.5">
        <span className="type-micro text-muted-foreground">{alt}</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        </div>
      </div>

      {ready ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/${src}`}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "block w-full",
            natural && "aspect-3/2 object-cover md:aspect-auto md:h-auto",
          )}
          style={
            natural
              ? { objectPosition: mobileFocus }
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
