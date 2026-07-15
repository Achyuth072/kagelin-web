import Link from "next/link";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { ScreenshotLightbox } from "@/components/ScreenshotLightbox";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kagelin.app";
const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Achyuth072/kagelin";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <main id="screenshot-gallery">
        <Hero />
        <HeroShot />
        <Pillars />
        <Screenshots />
        <AlsoLine />
        <FoundingTester />
        <Sustains />
        <Faq />
      </main>
      <SiteFooter />
      <ScreenshotLightbox />
    </div>
  );
}

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-7xl px-5 md:px-8 ${className}`}>
      {children}
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22 0 1.6-.02 2.9-.02 3.29 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function GitHubIconLink() {
  return (
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kagelin on GitHub"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-seijaku hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
    >
      <GitHubIcon />
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/kagelin-icon.png"
            alt="Kagelin"
            width={28}
            height={28}
            className="h-7 w-7 rounded-md"
          />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Kagelin
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <GitHubIconLink />
          <a
            href={APP_URL}
            className="type-ui inline-flex h-9 items-center rounded-lg border border-border/80 px-3.5 text-foreground transition-seijaku hover:bg-secondary"
          >
            Open the app
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="type-kicker text-brand-strong">
          Work quietly. Own everything.
        </p>
        <h1 className="type-h1 mt-5 text-balance text-foreground">
          The productivity app that doesn&rsquo;t fight for your attention.
        </h1>
        <p className="type-body mt-5 max-w-2xl text-pretty text-muted-foreground md:text-[17px]">
          Tasks, focus, habits, and a calendar in one calm space that works
          offline. Nothing here is built to hook you or guilt you into coming
          back. Just your work, without the noise.
        </p>
        <div className="mt-8 w-full max-w-md">
          <WaitlistForm />
        </div>
      </div>
    </Section>
  );
}

function HeroShot() {
  // Wider container than the text sections — the board is the hero visual.
  return (
    <div className="mx-auto w-full max-w-340 px-5 pb-16 md:px-8 md:pb-24">
      <ScreenshotFrame
        src="screenshots/board-view-desktop.png"
        alt="Board view"
        label="Board view"
        ready
        natural
        priority
        mobileFocus="90%"
      />
    </div>
  );
}

const PILLARS: { title: string; body: string }[] = [
  {
    title: "No dopamine bait",
    body: "No confetti, no dark patterns, no notifications engineered to pull you back. Streaks are there if you want them, never used to guilt you into showing up.",
  },
  {
    title: "Offline-first",
    body: "Everything works with no connection and no account. Guest mode keeps your data on your device, and you only sync if you want to.",
  },
  {
    title: "Free & open (AGPL)",
    body: "Run it in guest mode or host it yourself, no account needed. The core app is free and open source under AGPL-3.0. Premium is optional, just for the hosted extras.",
  },
];

function Pillars() {
  return (
    <Section className="border-t border-border py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {PILLARS.map((p) => (
          <div key={p.title}>
            <h2 className="type-h3 text-foreground">{p.title}</h2>
            <p className="type-body mt-2 text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SHOTS: {
  src: string;
  alt: string;
  label: string;
  caption: string;
  // Horizontal crop focus for the mobile thumbnail — see ScreenshotFrame.
  mobileFocus: string;
}[] = [
  {
    src: "screenshots/calendar-monthly.png",
    alt: "Calendar",
    label: "Calendar",
    caption:
      "A real calendar with Google and Outlook sync, not a to-do list with dates bolted on.",
    mobileFocus: "85%",
  },
  {
    src: "screenshots/timer-with-task.png",
    alt: "Focus timer",
    label: "Focus timer",
    caption:
      "A quiet Pomodoro timer that stays with you in Picture-in-Picture while you work.",
    mobileFocus: "center",
  },
  {
    src: "screenshots/habit-grid-desktop.png",
    alt: "Habits",
    label: "Habits",
    caption:
      "Track habits without the guilt. Streaks and a calm grid you can glance at, not a scoreboard.",
    mobileFocus: "100%",
  },
  {
    src: "screenshots/command-pallete-desktop.png",
    alt: "Command palette",
    label: "Command palette",
    caption:
      "Press Ctrl or Cmd-K to jump to any task, habit, event, or action. No hunting through menus.",
    mobileFocus: "center",
  },
];

function Screenshots() {
  return (
    <Section className="border-t border-border py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {SHOTS.map((s) => (
          <figure key={s.src}>
            <ScreenshotFrame
              src={s.src}
              alt={s.alt}
              label={s.label}
              ready
              natural
              mobileFocus={s.mobileFocus}
            />
            <figcaption className="type-body mt-3 text-muted-foreground">
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function AlsoLine() {
  const items = [
    "recurring tasks",
    ".ics import and export",
    "full keyboard control",
    "installable PWA",
    "encrypted export",
  ];
  return (
    <Section className="border-t border-border py-10">
      <p className="type-ui flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-muted-foreground">
        <span className="text-foreground">Also</span>
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-x-3">
            {i > 0 && <span className="text-muted-foreground">·</span>}
            <span>{item}</span>
          </span>
        ))}
      </p>
    </Section>
  );
}

function FoundingTester() {
  return (
    <Section className="border-t border-border py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="type-kicker text-brand-strong">Founding testers</p>
        <h2 className="type-h2 mt-4 text-foreground">Help shape it early.</h2>
        <p className="type-body mt-4 text-muted-foreground">
          A small group of founding testers gets in before everything is
          polished. If you actually use it and tell us what breaks, you get a
          year of Premium free, plus a founding discount that stays as long as
          you do. It&rsquo;s a thank-you for showing up early, not a countdown
          timer.
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
          Premium only covers the hosted extras like background calendar sync,
          focus across devices, and push briefings. The app itself stays free.
        </p>
      </div>
      <div className="mt-8 max-w-xl">
        <WaitlistForm />
      </div>
    </Section>
  );
}

function Sustains() {
  return (
    <Section className="border-t border-border py-16 md:py-20">
      <div className="max-w-2xl">
        <h2 className="type-h2 text-foreground">How Kagelin sustains itself</h2>
        <p className="type-body mt-4 text-muted-foreground">
          Kagelin is free and open source, and the app stays that way. The part
          that costs real money to run is the hosted layer: background calendar
          sync, focus across devices, push briefings. Premium is an optional
          subscription that covers those, and it&rsquo;s what pays for
          development. If you self-host or use guest mode, you never touch it.
        </p>
        <p className="type-body mt-3 text-muted-foreground">
          You can also support the project directly.
        </p>
        <div className="mt-5">
          <a
            href="https://github.com/sponsors/Achyuth072"
            target="_blank"
            rel="noopener noreferrer"
            className="type-ui inline-flex h-9 items-center gap-2 rounded-lg border border-border/80 px-4 text-foreground transition-seijaku hover:bg-secondary"
          >
            <GitHubIcon />
            GitHub Sponsors
          </a>
        </div>
      </div>
    </Section>
  );
}

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is it free?",
    a: "Yes, to use. Every task, habit, focus, and calendar feature is free and needs no account. The app is open source under AGPL-3.0. Premium is an optional paid tier that only covers the hosted sync extras.",
  },
  {
    q: "Do I need an account?",
    a: "No. Guest mode gives you everything, offline, with your data kept on your device. You only make an account if you want to sync across devices.",
  },
  {
    q: "When does it launch?",
    a: "It's in preview now, opening to founding testers first. Join the list and we'll email you when invites go out. No spam, no newsletter.",
  },
  {
    q: "Is my data private?",
    a: "Your data is yours. Guest mode keeps it on your device, self-hosting points sync at your own WebDAV server, and you can leave anytime with encrypted export and standard .ics files.",
  },
];

function Faq() {
  return (
    <Section className="border-t border-border py-16 md:py-20">
      <h2 className="type-h2 text-foreground">Questions</h2>
      <dl className="mt-8 grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
        {FAQ.map((item) => (
          <div key={item.q}>
            <dt className="type-h3 text-foreground">{item.q}</dt>
            <dd className="type-body mt-2 text-muted-foreground">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/kagelin-icon.png"
                alt="Kagelin"
                width={24}
                height={24}
                className="h-6 w-6 rounded-md"
              />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">
                Kagelin
              </span>
            </div>
            <p className="type-micro mt-2.5 text-muted-foreground">
              Work quietly. Own everything. · AGPL-3.0
            </p>
            <p className="type-micro mt-2 max-w-sm text-muted-foreground">
              We only use your email to send launch invites. You can ask us to
              delete it anytime.
            </p>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href={APP_URL}
              className="type-ui text-muted-foreground transition-seijaku hover:text-foreground"
            >
              Open the app
            </a>
            <GitHubIconLink />
          </nav>
        </div>
      </Section>
    </footer>
  );
}
