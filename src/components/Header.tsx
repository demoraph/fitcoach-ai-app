"use client";

import type { LevelInfo } from "@/lib/types";

export function Header({
  levelInfo,
  onOpenTracker,
}: {
  levelInfo: LevelInfo;
  onOpenTracker: () => void;
}) {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
      <span className="text-sm font-medium text-ink">FitCoach AI</span>
      <button
        type="button"
        onClick={onOpenTracker}
        className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted md:hidden"
      >
        <span className="font-mono tabular-nums text-gold">
          {String(levelInfo.level).padStart(2, "0")}
        </span>
        <span>training log</span>
      </button>
    </header>
  );
}
