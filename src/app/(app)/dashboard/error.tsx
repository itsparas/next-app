"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8 text-center space-y-4">
      <h2 className="text-xl font-bold text-red-300">Dashboard Error</h2>
      <p className="text-gray-400 text-sm">{error.message}</p>
      <p className="text-gray-500 text-xs">
        This error was caught by{" "}
        <code className="text-red-400">app/(app)/dashboard/error.tsx</code>.
        The root layout and nav are still working — only the dashboard segment
        errored.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-red-600/80 text-white text-sm hover:bg-red-500 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
