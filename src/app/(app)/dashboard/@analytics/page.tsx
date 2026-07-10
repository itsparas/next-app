import { getAnalytics } from "@/lib/db";

export default async function AnalyticsSlot() {
  const stats = await getAnalytics(); // 1.5s delay

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-4">
      <h3 className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
        Analytics
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-2xl font-bold text-white">{stats.totalPosts}</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.totalComments}</p>
          <p className="text-xs text-gray-500">Comments</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
        <div>
          <p className="text-sm font-medium text-white truncate">
            {stats.topPost}
          </p>
          <p className="text-xs text-gray-500">Top Post</p>
        </div>
      </div>
    </div>
  );
}
