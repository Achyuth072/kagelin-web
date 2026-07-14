"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

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

// When NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (local dev), renders nothing and
// the server verify is skipped, so the form stays usable.
export function Turnstile({
  onVerify,
  onExpire,
}: {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!siteKey) return;

    const render = () => {
      if (!containerRef.current || !window.turnstile) return;
      if (widgetIdRef.current) return; // already rendered
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: resolvedTheme === "dark" ? "dark" : "light",
        size: "flexible",
        callback: onVerify,
        "expired-callback": onExpire,
      });
    };

    if (window.turnstile) {
      render();
    } else if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = render;
      document.head.appendChild(script);
    } else {
      // Script tag exists but not yet ready — poll briefly.
      const t = setInterval(() => {
        if (window.turnstile) {
          clearInterval(t);
          render();
        }
      }, 100);
      return () => clearInterval(t);
    }

    const id = widgetIdRef.current;
    return () => {
      if (id && window.turnstile) window.turnstile.remove(id);
      widgetIdRef.current = null;
    };
    // resolvedTheme omitted: re-rendering on theme flip drops an in-progress token.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, onVerify, onExpire]);

  if (!siteKey) return null;
  return <div ref={containerRef} className="min-h-[65px]" />;
}
