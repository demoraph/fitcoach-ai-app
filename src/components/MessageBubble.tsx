import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMessage } from "@/lib/types";

const markdownComponents = {
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-3 last:mb-0 leading-relaxed" {...props} />
  ),
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h3 className="mt-4 mb-2 text-base font-semibold text-ink first:mt-0" {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h3 className="mt-4 mb-2 text-base font-semibold text-ink first:mt-0" {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h4 className="mt-3 mb-1.5 text-sm font-semibold text-ink first:mt-0" {...props} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-3 ml-4 list-disc space-y-1 last:mb-0" {...props} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-3 ml-4 list-decimal space-y-1 last:mb-0" {...props} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li className="leading-relaxed pl-1" {...props} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  a: (props: React.ComponentPropsWithoutRef<"a">) => (
    <a className="underline decoration-teal/50 underline-offset-2 hover:decoration-teal" {...props} />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-surface-raised px-1.5 py-0.5 font-mono text-[0.85em]" {...props} />
  ),
};

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isCoach = message.role === "coach";

  if (isCoach) {
    return (
      <div
        className="mx-auto flex w-full max-w-[38rem] gap-3 px-1"
        style={{ animation: "rise-in 240ms ease-out both" }}
      >
        <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
        <div className="min-w-0 flex-1">
          <div className="mb-1 font-mono text-[0.6875rem] tracking-[0.02em] text-muted">
            Coach
          </div>
          <div className="text-[0.9375rem] text-ink/90">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto w-full max-w-[38rem] px-1"
      style={{ animation: "rise-in 240ms ease-out both" }}
    >
      <div className="rounded-md border-l-2 border-gold/60 bg-surface px-4 py-3">
        <div className="mb-1 font-mono text-[0.6875rem] tracking-[0.02em] text-gold/80">
          You
        </div>
        <p className="whitespace-pre-wrap text-[0.9375rem] leading-relaxed text-ink/90">
          {message.content}
        </p>
      </div>
    </div>
  );
}
