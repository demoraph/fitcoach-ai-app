const PROMPTS = [
  "I'm new to lifting and can train 3 days a week.",
  "Build me a simple mobility routine for tight hips.",
  "How much protein do I actually need to build muscle?",
  "I have 20 minutes and just a yoga mat today.",
];

export function EmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[38rem] flex-1 flex-col justify-center px-1 py-10">
      <h1 className="text-xl font-medium text-ink">What are we working on today?</h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        Ask about training, mobility, or nutrition. The coach remembers this
        conversation, so feel free to pick up where you left off.
      </p>
      <div className="mt-6 flex flex-col gap-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            className="w-fit rounded-md border border-border px-3 py-2 text-left text-sm text-ink/80 transition-colors hover:border-teal/60 hover:text-ink"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
