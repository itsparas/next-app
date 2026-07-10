export default function ActivityLoading() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-4 animate-pulse">
      <div className="h-4 w-28 bg-gray-800 rounded" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-1.5" />
            <div className="space-y-1 flex-1">
              <div className="h-4 w-3/4 bg-gray-800 rounded" />
              <div className="h-3 w-1/2 bg-gray-800/50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
