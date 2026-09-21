export type ChatRole = "user" | "coach";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
}

export interface GamificationState {
  totalMessages: number;
  streakDays: number;
  lastMessageDate: string | null;
  unlockedBadgeIds: string[];
}

export interface LevelInfo {
  level: number;
  messagesIntoLevel: number;
  messagesPerLevel: number;
  progress: number;
}
