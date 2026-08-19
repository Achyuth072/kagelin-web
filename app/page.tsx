import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistProvider } from "@/components/WaitlistProvider";
import { ScreenshotFrame } from "@/components/ScreenshotFrame";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { ScreenshotLightbox } from "@/components/ScreenshotLightbox";
import {
  Section,
  SiteHeader,
  SiteFooter,
  GitHubIcon,
  KofiIcon,
} from "@/components/SiteChrome";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <WaitlistProvider>
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
      </WaitlistProvider>
      <SiteFooter />
      <ScreenshotLightbox />
    </div>
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
        sizes="(min-width: 1360px) 1360px, 100vw"
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

function Screenshots() {
  return (
    <Section className="border-t border-border py-16 md:py-20">
      <ScreenshotGallery />
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
      <p className="type-ui flex flex-col items-start gap-y-2 font-mono text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-3">
        <span className="text-foreground">Also</span>
        {items.map((item, i) => (
          <span
            key={item}
            className="flex items-center gap-x-3 whitespace-nowrap"
          >
            <span className="text-muted-foreground sm:hidden">·</span>
            <span>{item}</span>
            {i < items.length - 1 && (
              <span className="hidden text-muted-foreground sm:inline">·</span>
            )}
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
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/sponsors/Achyuth072"
            target="_blank"
            rel="noopener noreferrer"
            className="type-ui inline-flex h-9 items-center gap-2 rounded-lg border border-border/80 px-4 text-foreground transition-seijaku hover:bg-secondary"
          >
            <GitHubIcon />
            GitHub Sponsors
          </a>
          <a
            href="https://ko-fi.com/oneakira"
            target="_blank"
            rel="noopener noreferrer"
            className="type-ui inline-flex h-9 items-center gap-2 rounded-lg border border-border/80 px-4 text-foreground transition-seijaku hover:bg-secondary"
          >
            <KofiIcon />
            Ko-fi
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
    a: "No. Guest mode is not invite-only and can be used anytime. It gives you everything offline, with your data kept on your device. You only make an account if you want to sync across devices.",
  },
  {
    q: "When does it launch?",
    a: "It is in preview now, opening to founding testers first. Guest mode can be used anytime, and you can join the list for cloud sync invites.",
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
      <div className="mt-8 max-w-2xl">
        {FAQ.map((item) => (
          <details
            key={item.q}
            name="faq"
            className="faq-item group"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 md:w-fit md:gap-3">
              <span className="type-h3 text-foreground">{item.q}</span>
              <ChevronIcon className="shrink-0 text-muted-foreground transition-seijaku group-open:rotate-180" />
            </summary>
            <p className="type-body pb-4 text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

