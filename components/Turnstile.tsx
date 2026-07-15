"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import { useTheme } from "next-themes";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";

// Shared across all Turnstile instances so concurrent mounts (e.g. two
// WaitlistForms) inject one script tag and await the same onload callback,
// instead of racing separate polling loops.
let turnstileReady: Promise<void> | null = null;
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileReady) {
    turnstileReady = new Promise((resolve, reject) => {
      window.onloadTurnstileCallback = resolve;
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      // Without this, a blocked/failed load (ad-blockers commonly target
      // Turnstile) leaves every mount awaiting a promise that never settles.
      script.onerror = () => {
        turnstileReady = null;
        reject(new Error("Failed to load Turnstile script"));
      };
      document.head.appendChild(script);
    });
  }
  return turnstileReady;
}

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "flexible";
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileRenderOptions) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

export interface TurnstileHandle {
  // Tokens are single-use; call after a failed submit to mint a fresh one.
  reset: () => void;
}

// When NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (local dev), renders nothing and
// the server verify is skipped, so the form stays usable.
export function Turnstile({
  onVerify,
  onExpire,
  ref,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  ref?: Ref<TurnstileHandle>;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }), []);

  useEffect(() => {
    if (!siteKey) return;
    let cancelled = false;

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: resolvedTheme === "dark" ? "dark" : "light",
          size: "flexible",
          callback: onVerify,
          "expired-callback": onExpire,
        });
      })
      .catch((err: unknown) => {
        if (!cancelled) console.error("[turnstile] script load failed:", err);
      });

    return () => {
      cancelled = true;
      // Read the ref live, not a value captured before render() ran async.
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
    // resolvedTheme omitted: re-rendering on theme flip drops an in-progress token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, onVerify, onExpire]);

  if (!siteKey) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
