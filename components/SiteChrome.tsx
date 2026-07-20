import Image from "next/image";
import Link from "next/link";

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.kagelin.app";
export const GITHUB_URL =
  process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Achyuth072/kagelin";

export function Section({
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

export function GitHubIcon() {
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

export function GitHubIconLink() {
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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
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

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
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
            <p className="type-micro mt-2 max-w-sm leading-relaxed text-muted-foreground">
              We only use your email to send launch invites. You can ask us to
              delete it anytime.
            </p>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="type-ui text-muted-foreground transition-seijaku hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="type-ui text-muted-foreground transition-seijaku hover:text-foreground"
            >
              Terms
            </Link>
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
