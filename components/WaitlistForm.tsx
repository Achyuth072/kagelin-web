"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Turnstile, type TurnstileHandle } from "@/components/Turnstile";
import { useWaitlistConfirmation } from "@/components/WaitlistProvider";
import { isValidEmail } from "@/lib/email";
import { cn } from "@/lib/utils";

type Phase = "idle" | "submitting" | "error";

export function WaitlistForm({ className }: { className?: string }) {
  const { confirmation, setConfirmation } = useWaitlistConfirmation();
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const tokenRef = useRef<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const inputId = useId();

  const onVerify = useCallback((token: string) => {
    tokenRef.current = token;
  }, []);
  const onExpire = useCallback(() => {
    tokenRef.current = "";
  }, []);

  // The spent token can't be replayed, so every failure needs a fresh one.
  const resetChallenge = useCallback(() => {
    tokenRef.current = "";
    turnstileRef.current?.reset();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "submitting") return;

    // Read the DOM, not state: autofill can set the value without firing onChange.
    const candidate = (inputRef.current?.value ?? email).trim();
    if (!isValidEmail(candidate)) {
      setPhase("error");
      setErrorMsg("That email doesn't look right — mind checking it?");
      return;
    }

    setPhase("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: candidate,
          turnstileToken: tokenRef.current,
        }),
      });
      const data = (await res.json()) as {
        status?: string;
        cohort?: string;
        error?: string;
      };

      if (!res.ok) {
        resetChallenge();
        setPhase("error");
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
        setConfirmation("already");
      } else if (data.cohort === "general") {
        setConfirmation("general");
      } else {
        setConfirmation("founding");
      }
    } catch {
      resetChallenge();
      setPhase("error");
      setErrorMsg("Couldn't reach the server. Check your connection and retry.");
    }
  }

  if (confirmation) {
    return (
      <div
        className={cn(
          "animate-rise-in rounded-xl border border-brand/30 bg-brand/6 px-5 py-4 text-left",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <CheckIcon />
          </span>
          <div>
            <p className="type-body font-medium text-foreground">
              {confirmation === "founding"
                ? "You're in."
                : confirmation === "general"
                  ? "The founding cohort is full, but you're on the list."
                  : "You're already on the list."}
            </p>
            <p className="type-body mt-1 text-muted-foreground">
              {confirmation === "founding"
                ? "We'll email you when founding invites go out. No spam and no newsletter, just the invite."
                : confirmation === "general"
                  ? "You're on the general launch list. We'll email you the day Kagelin opens up."
                  : "No need to sign up again. We'll be in touch when invites go out."}
            </p>
          </div>
        </div>
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
          ref={inputRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-12 w-full rounded-lg border border-input bg-background px-3.5 text-foreground placeholder:text-muted-foreground transition-seijaku focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none sm:h-11 sm:w-auto sm:flex-1"
        />
        <button
          type="submit"
          disabled={phase === "submitting"}
          className="h-12 shrink-0 rounded-lg bg-brand px-5 font-medium text-brand-foreground shadow-sm shadow-brand/10 transition-seijaku hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:h-11"
        >
          {phase === "submitting" ? "One moment…" : "Join the waitlist"}
        </button>
      </div>

      {phase === "error" && (
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
        <Turnstile ref={turnstileRef} onVerify={onVerify} onExpire={onExpire} />
      </div>
    </form>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
