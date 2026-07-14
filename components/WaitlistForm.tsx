"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Turnstile } from "@/components/Turnstile";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "founding" | "general" | "already" | "error";

/**
 * Founding-tester waitlist form. Used twice on the page (hero + founding
 * section). Email-only by design — every extra field costs conversion. Turnstile
 * runs invisibly-ish below the field; the server owns verification + the cap.
 */
export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const tokenRef = useRef<string>("");
  const inputId = useId();

  const onVerify = useCallback((token: string) => {
    tokenRef.current = token;
  }, []);
  const onExpire = useCallback(() => {
    tokenRef.current = "";
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          turnstileToken: tokenRef.current,
        }),
      });
      const data = (await res.json()) as {
        status?: string;
        cohort?: string;
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data.error === "invalid_email"
            ? "That email doesn't look right — mind checking it?"
            : data.error === "failed_challenge"
              ? "The anti-spam check didn't pass. Please try again."
              : "Something went wrong on our end. Please try again in a moment.",
        );
        return;
      }

      if (data.status === "already") {
        setStatus("already");
      } else if (data.cohort === "general") {
        setStatus("general");
      } else {
        setStatus("founding");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Check your connection and retry.");
    }
  }

  // Success / terminal states get a calm confirmation panel instead of the form.
  if (status === "founding" || status === "general" || status === "already") {
    return (
      <div
        className={cn(
          "rounded-xl border border-border/80 bg-card px-5 py-4",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <p className="type-body font-medium text-foreground">
          {status === "founding"
            ? "You're in."
            : status === "general"
              ? "The founding cohort is full, but you're on the list."
              : "You're already on the list."}
        </p>
        <p className="type-body mt-1 text-muted-foreground">
          {status === "founding"
            ? "We'll email you when founding invites go out. No spam and no newsletter, just the invite."
            : status === "general"
              ? "You're on the general launch list. We'll email you the day Kagelin opens up."
              : "No need to sign up again. We'll be in touch when invites go out."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-11 flex-1 rounded-lg border border-input bg-background px-3.5 text-foreground placeholder:text-muted-foreground transition-seijaku focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 shrink-0 rounded-lg bg-brand px-5 font-medium text-brand-foreground shadow-sm shadow-brand/10 transition-seijaku hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "One moment…" : "Join the waitlist"}
        </button>
      </div>

      {status === "error" && (
        <p
          className="type-ui mt-2 text-destructive"
          role="alert"
          aria-live="assertive"
        >
          {errorMsg}
        </p>
      )}

      <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
        Founding invites are limited and go to testers who actually try it. No
        spam, no newsletter.
      </p>

      <div className="mt-3">
        <Turnstile onVerify={onVerify} onExpire={onExpire} />
      </div>
    </form>
  );
}
