"use client";

import { useEffect, useState } from "react";
import type { ChatMessage, GamificationState } from "@/lib/types";
import { getOrCreateSessionId } from "@/lib/session";
import { loadMessages, saveMessages } from "@/lib/chatStore";
import {
  getLevelInfo,
  loadGamificationState,
  recordMessageSent,
  saveGamificationState,
} from "@/lib/gamification";
import { Header } from "./Header";
import { ChatPanel } from "./ChatPanel";
import { TrackerPanel } from "./TrackerPanel";
import { MobileTrackerSheet } from "./MobileTrackerSheet";
import { LevelUpMoment } from "./LevelUpMoment";

const DEFAULT_GAMIFICATION: GamificationState = {
  totalMessages: 0,
  streakDays: 0,
  lastMessageDate: null,
  unlockedBadgeIds: [],
};

export function AppShell() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [gamification, setGamification] = useState<GamificationState>(DEFAULT_GAMIFICATION);
  const [draft, setDraft] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [levelUpTo, setLevelUpTo] = useState<number | null>(null);
  const [mobileTrackerOpen, setMobileTrackerOpen] = useState(false);

  useEffect(() => {
    // Deliberately deferred to an effect, not a lazy initial state: these values
    // come from localStorage and must stay empty during SSR/hydration so the
    // server- and client-rendered markup match, then hydrate in right after.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(getOrCreateSessionId());
    setMessages(loadMessages());
    setGamification(loadGamificationState());
  }, []);

  async function callCoach(text: string, historyBeforeReply: ChatMessage[]) {
    setError(null);
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatInput: text, sessionId }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || typeof data?.output !== "string") {
        setError(
          data?.message ?? "Something went wrong generating a response. Please try again.",
        );
        return;
      }

      const coachMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "coach",
        content: data.output,
        createdAt: new Date().toISOString(),
      };
      const withReply = [...historyBeforeReply, coachMessage];
      setMessages(withReply);
      saveMessages(withReply);

      const result = recordMessageSent(gamification);
      setGamification(result.state);
      saveGamificationState(result.state);
      if (result.leveledUp) {
        setLevelUpTo(getLevelInfo(result.state.totalMessages).level);
      }
    } catch {
      setError("Couldn't reach the coach right now. Please try again in a moment.");
    } finally {
      setIsThinking(false);
    }
  }

  async function handleSend() {
    const text = draft.trim();
    if (!text || isThinking || !sessionId) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    saveMessages(nextMessages);
    setDraft("");

    await callCoach(text, nextMessages);
  }

  async function handleRetry() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    await callCoach(lastUser.content, messages);
  }

  const levelInfo = getLevelInfo(gamification.totalMessages);

  return (
    <div className="flex h-dvh flex-col bg-bg text-ink">
      <Header levelInfo={levelInfo} onOpenTracker={() => setMobileTrackerOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <ChatPanel
          messages={messages}
          isThinking={isThinking}
          error={error}
          onRetry={handleRetry}
          draft={draft}
          onDraftChange={setDraft}
          onSend={handleSend}
        />
        <aside className="hidden w-80 shrink-0 border-l border-border md:block">
          <TrackerPanel gamification={gamification} levelInfo={levelInfo} />
        </aside>
      </div>
      {mobileTrackerOpen && (
        <MobileTrackerSheet
          gamification={gamification}
          levelInfo={levelInfo}
          onClose={() => setMobileTrackerOpen(false)}
        />
      )}
      {levelUpTo !== null && (
        <LevelUpMoment level={levelUpTo} onDone={() => setLevelUpTo(null)} />
      )}
    </div>
  );
}
