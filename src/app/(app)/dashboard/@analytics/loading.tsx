export default function AnalyticsLoading() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-4 animate-pulse">
      <div className="h-4 w-20 bg-gray-800 rounded" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-1">
            <div className="h-7 w-12 bg-gray-800 rounded" />
            <div className="h-3 w-16 bg-gray-800/50 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
