export default function BlogLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
      <div className="h-9 w-32 bg-gray-800 rounded" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden"
          >
            <div className="h-32 bg-gray-800" />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 bg-gray-800 rounded" />
              <div className="h-4 w-full bg-gray-800/50 rounded" />
              <div className="h-3 w-1/3 bg-gray-800/30 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
