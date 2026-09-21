import type { Badge, GamificationState, LevelInfo } from "@/lib/types";
import { BADGES } from "@/lib/gamification";

function BadgeMark({ unlocked }: { unlocked: boolean }) {
  if (unlocked) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="var(--color-gold)" strokeWidth="1.5" />
        <path
          d="M5 8.2 7 10.2 11 6"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="var(--color-border)"
        strokeWidth="1.5"
        strokeDasharray="2.5 2.5"
      />
    </svg>
  );
}

function BadgeTile({ badge, unlocked }: { badge: Badge; unlocked: boolean }) {
  return (
    <div
      className={`flex items-start gap-2 rounded-md border px-2.5 py-2 ${
        unlocked ? "border-gold/30 bg-gold-dim/40" : "border-border"
      }`}
    >
      <div className="mt-0.5 shrink-0">
        <BadgeMark unlocked={unlocked} />
      </div>
      <div className="min-w-0">
        <div className={`text-xs font-medium ${unlocked ? "text-ink" : "text-muted"}`}>
          {badge.title}
        </div>
      </div>
    </div>
  );
}

export function TrackerPanel({
  gamification,
  levelInfo,
}: {
  gamification: GamificationState;
  levelInfo: LevelInfo;
}) {
  const toNext = levelInfo.messagesPerLevel - levelInfo.messagesIntoLevel;

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-5 py-6">
      <div>
        <h2 className="text-sm font-medium text-ink">Training log</h2>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Progress from showing up, not from any single workout.
        </p>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl tabular-nums text-gold">
            {String(levelInfo.level).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted">level</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-raised">
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
            style={{ width: `${Math.round(levelInfo.progress * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          {toNext === levelInfo.messagesPerLevel
            ? "Send a message to start this level"
            : `${toNext} ${toNext === 1 ? "message" : "messages"} to level ${levelInfo.level + 1}`}
        </p>
      </div>

      <div className="flex items-center justify-between border-y border-border py-3">
        <div>
          <div className="font-mono text-xl tabular-nums text-teal">
            {gamification.streakDays}
          </div>
          <div className="text-xs text-muted">day streak</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-xl tabular-nums text-ink">
            {gamification.totalMessages}
          </div>
          <div className="text-xs text-muted">messages logged</div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium text-muted">Milestones</h3>
        <div className="mt-2 grid grid-cols-1 gap-2">
          {BADGES.map((badge) => (
            <BadgeTile
              key={badge.id}
              badge={badge}
              unlocked={gamification.unlockedBadgeIds.includes(badge.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
