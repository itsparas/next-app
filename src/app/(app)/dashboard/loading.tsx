export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-9 w-48 bg-gray-800 rounded" />
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-48 rounded-xl bg-gray-800/50" />
        <div className="h-48 rounded-xl bg-gray-800/50" />
      </div>
      <div className="h-32 rounded-xl bg-gray-800/30" />
    </div>
  );
}
