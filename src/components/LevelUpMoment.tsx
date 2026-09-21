"use client";

import { useEffect } from "react";

export function LevelUpMoment({ level, onDone }: { level: number; onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      role="status"
      aria-live="assertive"
    >
      <div className="relative flex flex-col items-center">
        <div
          className="absolute h-24 w-24 rounded-full border border-gold/50"
          style={{ animation: "level-up-ring 1.4s ease-out" }}
        />
        <div
          className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border border-gold bg-bg shadow-[0_0_40px_-8px_var(--color-gold)]"
          style={{ animation: "level-up-pop 0.5s ease-out" }}
        >
          <span className="font-mono text-2xl tabular-nums text-gold">
            {String(level).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-4 font-mono text-xs text-gold">Level up</p>
      </div>
    </div>
  );
}
