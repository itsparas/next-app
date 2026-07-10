import Link from "next/link";

export default function AppLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-6">
      <aside className="hidden lg:block space-y-1 pt-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          App
        </p>
        <Link
          href="/dashboard"
          className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/settings"
          className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
        >
          Settings
        </Link>
        <Link
          href="/blog"
          className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors"
        >
          Blog
        </Link>
      </aside>
      <div>{children}</div>
    </div>
  );
}
