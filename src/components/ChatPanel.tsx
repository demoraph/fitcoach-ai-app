"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { Composer } from "./Composer";
import { ThinkingIndicator } from "./ThinkingIndicator";

export function ChatPanel({
  messages,
  isThinking,
  error,
  onRetry,
  draft,
  onDraftChange,
  onSend,
}: {
  messages: ChatMessage[];
  isThinking: boolean;
  error: string | null;
  onRetry: () => void;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, isThinking, error]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 py-6"
        aria-live="polite"
      >
        {messages.length === 0 && !isThinking ? (
          <EmptyState onPick={onDraftChange} />
        ) : (
          messages.map((message) => <MessageBubble key={message.id} message={message} />)
        )}
        {isThinking && <ThinkingIndicator />}
        {error && <ErrorState message={error} onRetry={onRetry} />}
      </div>
      <Composer value={draft} onChange={onDraftChange} onSubmit={onSend} disabled={isThinking} />
    </div>
  );
}
