import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-4 pt-8">
        <h1 className="text-4xl font-bold tracking-tight">
          App Router Playground
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          A mini blog/dashboard platform built to demonstrate{" "}
          <strong className="text-white">every major Next.js App Router feature</strong>{" "}
          in a real, working app. Each feature is used for a real purpose and
          explained inline with a Feature Explainer panel.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/blog"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            Blog
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Server Components, dynamic routes, caching, and more.
          </p>
        </Link>

        <Link
          href="/dashboard"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            Dashboard
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Parallel routes, nested layouts, protected area.
          </p>
        </Link>

        <Link
          href="/feature-map"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            Feature Map
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            All 15 features indexed with direct links.
          </p>
        </Link>

        <Link
          href="/cache-lab"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            Cache Lab
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Interactive demos of all 4 caching layers.
          </p>
        </Link>

        <Link
          href="/streaming"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            Streaming
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Suspense boundaries with staggered data.
          </p>
        </Link>

        <Link
          href="/ppr"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            PPR Demo
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Static shell + dynamic personalized content.
          </p>
        </Link>

        <Link
          href="/landing"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            Marketing Pages
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Route groups with independent layouts.
          </p>
        </Link>

        <Link
          href="/about"
          className="group rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-indigo-500/50 transition-colors"
        >
          <h2 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
            About / Turbopack
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Dev info and Turbopack explainer.
          </p>
        </Link>
      </div>
    </div>
  );
}
