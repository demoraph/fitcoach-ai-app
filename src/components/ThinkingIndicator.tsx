export function ThinkingIndicator() {
  return (
    <div className="mx-auto flex w-full max-w-[38rem] gap-3 px-1">
      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
      <div className="flex items-center gap-1 py-1" role="status" aria-label="Coach is thinking">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted"
            style={{
              animation: "thinking-pulse 1.1s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
