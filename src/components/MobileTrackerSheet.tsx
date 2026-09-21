"use client";

import type { GamificationState, LevelInfo } from "@/lib/types";
import { TrackerPanel } from "./TrackerPanel";

export function MobileTrackerSheet({
  gamification,
  levelInfo,
  onClose,
}: {
  gamification: GamificationState;
  levelInfo: LevelInfo;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end md:hidden">
      <button
        type="button"
        aria-label="Close training log"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative max-h-[80vh] w-full rounded-t-xl border-t border-border bg-bg">
        <div className="flex justify-center pt-2">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>
        <TrackerPanel gamification={gamification} levelInfo={levelInfo} />
      </div>
    </div>
  );
}
