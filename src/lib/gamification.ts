import type { Badge, GamificationState, LevelInfo } from "./types";

const GAMIFICATION_KEY = "fitcoach.gamification";

export const MESSAGES_PER_LEVEL = 8;

export const BADGES: Badge[] = [
  {
    id: "first-session",
    title: "First session logged",
    description: "Sent your first message to the coach.",
  },
  {
    id: "level-5",
    title: "Level 5",
    description: "Reached level 5.",
  },
  {
    id: "week-streak",
    title: "7-day streak",
    description: "Talked to the coach on 7 days in a row.",
  },
  {
    id: "fifty-logged",
    title: "50 messages logged",
    description: "Sent 50 messages total.",
  },
];

const DEFAULT_STATE: GamificationState = {
  totalMessages: 0,
  streakDays: 0,
  lastMessageDate: null,
  unlockedBadgeIds: [],
};

export function loadGamificationState(): GamificationState {
  if (typeof window === "undefined") return DEFAULT_STATE;

  try {
    const raw = window.localStorage.getItem(GAMIFICATION_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveGamificationState(state: GamificationState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(state));
}

export function getLevelInfo(totalMessages: number): LevelInfo {
  const level = Math.floor(totalMessages / MESSAGES_PER_LEVEL) + 1;
  const messagesIntoLevel = totalMessages % MESSAGES_PER_LEVEL;
  const progress = messagesIntoLevel / MESSAGES_PER_LEVEL;
  return { level, messagesIntoLevel, messagesPerLevel: MESSAGES_PER_LEVEL, progress };
}

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isYesterday(previous: string, today: string): boolean {
  const prevDate = new Date(`${previous}T00:00:00`);
  const todayDate = new Date(`${today}T00:00:00`);
  const diffDays = Math.round((todayDate.getTime() - prevDate.getTime()) / 86_400_000);
  return diffDays === 1;
}

export interface RecordMessageResult {
  state: GamificationState;
  previousLevel: number;
  leveledUp: boolean;
  newlyUnlockedBadges: Badge[];
}

export function recordMessageSent(state: GamificationState): RecordMessageResult {
  const today = toLocalDateString(new Date());
  const previousLevel = getLevelInfo(state.totalMessages).level;

  let streakDays = state.streakDays;
  if (state.lastMessageDate === today) {
    // already counted today
  } else if (state.lastMessageDate && isYesterday(state.lastMessageDate, today)) {
    streakDays += 1;
  } else {
    streakDays = 1;
  }

  const totalMessages = state.totalMessages + 1;
  const level = getLevelInfo(totalMessages).level;

  const unlockedBadgeIds = new Set(state.unlockedBadgeIds);
  const newlyUnlockedBadges: Badge[] = [];

  const maybeUnlock = (badge: Badge, condition: boolean) => {
    if (condition && !unlockedBadgeIds.has(badge.id)) {
      unlockedBadgeIds.add(badge.id);
      newlyUnlockedBadges.push(badge);
    }
  };

  maybeUnlock(BADGES[0], totalMessages >= 1);
  maybeUnlock(BADGES[1], level >= 5);
  maybeUnlock(BADGES[2], streakDays >= 7);
  maybeUnlock(BADGES[3], totalMessages >= 50);

  const nextState: GamificationState = {
    totalMessages,
    streakDays,
    lastMessageDate: today,
    unlockedBadgeIds: Array.from(unlockedBadgeIds),
  };

  return {
    state: nextState,
    previousLevel,
    leveledUp: level > previousLevel,
    newlyUnlockedBadges,
  };
}
