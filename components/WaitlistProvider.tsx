"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ConfirmationStatus = "founding" | "general" | "already";

type WaitlistContextValue = {
  confirmation: ConfirmationStatus | null;
  setConfirmation: (status: ConfirmationStatus) => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

// WaitlistForm mounts twice on the page; sharing confirmation here keeps both in sync.
export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [confirmation, setConfirmation] = useState<ConfirmationStatus | null>(
    null,
  );
  return (
    <WaitlistContext.Provider value={{ confirmation, setConfirmation }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlistConfirmation() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error(
      "useWaitlistConfirmation must be used within a WaitlistProvider",
    );
  }
  return ctx;
}
