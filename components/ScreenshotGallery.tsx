"use client";

import { useState } from "react";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { cn } from "@/lib/utils";

const SHOTS: { src: string; alt: string; label: string; caption: string }[] = [
  {
    src: "screenshots/calendar-monthly.webp",
    alt: "Calendar",
    label: "Calendar",
    caption:
      "A real calendar with Google and Outlook sync, not a to-do list with dates bolted on.",
  },
  {
    src: "screenshots/timer-with-task.webp",
    alt: "Focus timer",
    label: "Focus timer",
    caption:
      "A quiet Pomodoro timer that stays with you in Picture-in-Picture while you work.",
  },
  {
    src: "screenshots/habit-grid-desktop.webp",
    alt: "Habits",
    label: "Habits",
    caption:
      "Track habits without the guilt. Streaks and a calm grid you can glance at, not a scoreboard.",
  },
  {
    src: "screenshots/command-pallete-desktop.webp",
    alt: "Command palette",
    label: "Command palette",
    caption:
      "Press Ctrl or Cmd-K to jump to any task, habit, event, or action. No hunting through menus.",
  },
];

// Mobile shows the first two shots; the rest expand on tap. Desktop shows all.
const VISIBLE_ON_MOBILE = 2;

export function ScreenshotGallery() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-10">
      {SHOTS.map((s, i) => (
        <figure
          key={s.src}
          className={cn(i >= VISIBLE_ON_MOBILE && !expanded && "hidden md:block")}
        >
          <ScreenshotFrame
            src={s.src}
            alt={s.alt}
            label={s.label}
            ready
            natural
            // 588px: one grid column once max-w-7xl caps the container (1216px content, gap-10).
            sizes="(min-width: 1280px) 588px, (min-width: 768px) 45vw, 100vw"
          />
          <figcaption className="type-body mt-3 text-muted-foreground">
            {s.caption}
          </figcaption>
        </figure>
      ))}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="type-ui inline-flex h-11 items-center justify-center rounded-lg border border-border/80 text-foreground transition-seijaku hover:bg-secondary focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none md:hidden"
        >
          Show {SHOTS.length - VISIBLE_ON_MOBILE} more screenshots
        </button>
      )}
    </div>
  );
}
