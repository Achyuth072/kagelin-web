import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import { LegalContent } from "@/components/LegalContent";
import { Section, SiteHeader, SiteFooter } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Terms of Service — Kagelin",
  description: "The terms governing your use of Kagelin.",
};

export default async function TermsPage() {
  const markdown = await readFile(
    path.join(process.cwd(), "content", "terms-of-service.md"),
    "utf-8",
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <LegalContent markdown={markdown} />
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
