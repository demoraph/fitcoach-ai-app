export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-[38rem] items-start gap-3 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm">
      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-danger" aria-hidden />
      <div className="flex-1">
        <p className="text-ink/90">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 font-mono text-xs text-danger hover:text-ink"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
