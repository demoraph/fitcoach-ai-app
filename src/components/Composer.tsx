"use client";

import { useRef } from "react";

export function Composer({
  value,
  onChange,
  onSubmit,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (value.trim() && !disabled) onSubmit();
    }
  };

  return (
    <div className="mx-auto w-full max-w-[38rem] px-1 pb-4 pt-2">
      <div className="flex items-end gap-2 rounded-lg border border-border bg-surface px-3 py-2 focus-within:border-teal/50">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask about training, mobility, or nutrition…"
          className="max-h-40 flex-1 resize-none bg-transparent py-1.5 text-[0.9375rem] text-ink placeholder:text-muted focus:outline-none"
          aria-label="Message"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className="mb-0.5 shrink-0 rounded-md bg-teal px-3 py-1.5 text-sm font-medium text-bg transition-opacity disabled:opacity-30"
        >
          Send
        </button>
      </div>
    </div>
  );
}
