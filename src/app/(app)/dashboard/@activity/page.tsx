import { getRecentActivity } from "@/lib/db";

export default async function ActivitySlot() {
  const activities = await getRecentActivity(); // 2s delay

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-4">
      <h3 className="text-sm font-semibold text-green-400 uppercase tracking-wider">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
            <div>
              <p className="text-gray-200">{a.action}</p>
              <p className="text-xs text-gray-500">
                {a.detail} &middot; {a.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
