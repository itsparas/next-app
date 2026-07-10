import Link from "next/link";
import { getSession } from "@/lib/auth";
import { AuthToggle } from "./auth-toggle";

export async function Nav() {
  const session = await getSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/feature-map", label: "Feature Map" },
    { href: "/streaming", label: "Streaming" },
    { href: "/cache-lab", label: "Cache Lab" },
    { href: "/ppr", label: "PPR" },
    { href: "/cache-component", label: "Use Cache" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-lg font-bold text-white tracking-tight"
        >
          DevNotes<span className="text-indigo-400">.</span>
        </Link>

        <div className="flex items-center gap-1 text-sm overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-2.5 py-1.5 rounded text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="px-2.5 py-1.5 rounded text-gray-300 hover:text-white hover:bg-gray-800/60 transition-colors whitespace-nowrap"
            >
              Dashboard
            </Link>
          )}
          <AuthToggle isLoggedIn={!!session} username={session?.username} />
        </div>
      </div>
    </nav>
  );
}
