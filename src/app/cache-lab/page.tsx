import { Suspense } from "react";
import { connection } from "next/server";
import { FeatureExplainer } from "@/components/feature-explainer";
import { getTimestamp, getMemoizableData } from "@/lib/db";

// ─── 1. Request Memoization Demo ──────────────────────────

async function MemoizationDemo() {
  // Call the same function twice in one render
  const call1 = await getMemoizableData();
  const call2 = await getMemoizableData();

  return (
    <div className="rounded-xl border border-blue-800/50 bg-blue-950/20 p-5 space-y-3">
      <h3 className="font-semibold text-blue-300">1. Request Memoization</h3>
      <p className="text-sm text-gray-400">
        Two calls to the same function in one render pass. React deduplicates
        them (if using fetch), so only one network call is made.
      </p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded bg-gray-800/50 p-3">
          <p className="text-xs text-gray-500">Call 1</p>
          <p className="text-gray-300 font-mono text-xs">
            callId: {call1.callId}, value: {call1.value.toFixed(4)}
          </p>
        </div>
        <div className="rounded bg-gray-800/50 p-3">
          <p className="text-xs text-gray-500">Call 2</p>
          <p className="text-gray-300 font-mono text-xs">
            callId: {call2.callId}, value: {call2.value.toFixed(4)}
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Note: Request memoization applies to <code>fetch()</code> calls with the
        same URL and options. Our in-memory DB functions are not automatically
        memoized — use <code>React.cache()</code> to wrap them for deduplication.
      </p>
    </div>
  );
}

// ─── 2. Data Cache Demo ───────────────────────────────────

async function DataCacheDemo() {
  const timestamp = await getTimestamp();

  return (
    <div className="rounded-xl border border-green-800/50 bg-green-950/20 p-5 space-y-3">
      <h3 className="font-semibold text-green-300">2. Data Cache</h3>
      <p className="text-sm text-gray-400">
        With <code>next: {"{"} revalidate: N {"}"}</code>, fetched data is
        cached and only refreshed every N seconds. Refresh this page — the
        timestamp below only updates after the revalidation window.
      </p>
      <div className="rounded bg-gray-800/50 p-3">
        <p className="text-xs text-gray-500">Timestamp from data layer</p>
        <p className="text-gray-300 font-mono text-sm">{timestamp}</p>
      </div>
      <p className="text-xs text-gray-500">
        In a real app: <code>fetch(url, {"{"} next: {"{"} revalidate: 60 {"}"} {"}"})</code>{" "}
        caches the response for 60 seconds. Our in-memory layer simulates this.
      </p>
    </div>
  );
}

// ─── 3. Full Route Cache Demo ─────────────────────────────

async function FullRouteCacheDemo() {
  await connection();
  const buildTimestamp = new Date().toISOString();

  return (
    <div className="rounded-xl border border-purple-800/50 bg-purple-950/20 p-5 space-y-3">
      <h3 className="font-semibold text-purple-300">3. Full Route Cache</h3>
      <p className="text-sm text-gray-400">
        Static routes are pre-rendered at build time and cached as HTML. The
        timestamp below was captured at render time — if this were a{" "}
        <code>force-static</code> page, it would never change until the next
        build.
      </p>
      <div className="rounded bg-gray-800/50 p-3">
        <p className="text-xs text-gray-500">Render timestamp</p>
        <p className="text-gray-300 font-mono text-sm">{buildTimestamp}</p>
      </div>
      <p className="text-xs text-gray-500">
        Dynamic pages (using cookies, headers, searchParams) opt out of the
        Full Route Cache and render on every request. This page is dynamic
        because it reads no static hints.
      </p>
    </div>
  );
}

// ─── 4. Router Cache Demo ─────────────────────────────────

function RouterCacheDemo() {
  return (
    <div className="rounded-xl border border-amber-800/50 bg-amber-950/20 p-5 space-y-3">
      <h3 className="font-semibold text-amber-300">4. Router Cache</h3>
      <p className="text-sm text-gray-400">
        The client-side Router Cache stores visited route segments in memory.
        Navigate away from this page and use the back button — the page appears
        instantly without a server round trip.
      </p>
      <div className="text-sm text-gray-400 space-y-1">
        <p>Try this:</p>
        <ol className="list-decimal ml-4 space-y-1">
          <li>Visit this Cache Lab page</li>
          <li>Click &quot;Blog&quot; in the nav</li>
          <li>Click the browser back button</li>
          <li>
            This page appears <em>instantly</em> — that is the Router Cache
          </li>
        </ol>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────

export default function CacheLabPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Cache Lab</h1>
      <p className="text-gray-400">
        Next.js has four caching layers. This page demonstrates each one
        interactively.
      </p>

      <div className="space-y-4">
        <Suspense
          fallback={
            <div className="h-40 rounded-xl bg-gray-800/30 animate-pulse" />
          }
        >
          <MemoizationDemo />
        </Suspense>

        <Suspense
          fallback={
            <div className="h-40 rounded-xl bg-gray-800/30 animate-pulse" />
          }
        >
          <DataCacheDemo />
        </Suspense>

        <Suspense
          fallback={
            <div className="h-40 rounded-xl bg-gray-800/30 animate-pulse" />
          }
        >
          <FullRouteCacheDemo />
        </Suspense>
        <RouterCacheDemo />
      </div>

      <FeatureExplainer
        featureId={9}
        title="Caching Model (4 Layers)"
        what={`Next.js has four caching layers:

1. Request Memoization — React deduplicates identical fetch() calls within a single server render. If two components fetch the same URL, only one request is made.

2. Data Cache — fetch() results are persisted across requests. Control freshness with next: { revalidate: N } (time-based) or revalidatePath/revalidateTag (on-demand).

3. Full Route Cache — at build time, static routes are pre-rendered to HTML and RSC payload. These cached artifacts are served directly from the CDN. Dynamic routes (cookies, headers, searchParams) opt out.

4. Router Cache — the client-side in-memory cache. Visited routes are cached in the browser, making back/forward navigation instant. Prefetched routes are partially cached even before visiting.`}
        whyHere="This page demonstrates all four layers in context. Each section targets one layer with a concrete example."
        code={`// Layer 1: Request Memoization (automatic for fetch)
const data1 = await fetch('/api/data'); // only 1 request
const data2 = await fetch('/api/data'); // deduped

// Layer 2: Data Cache
const res = await fetch('/api/data', {
  next: { revalidate: 60 } // cache for 60s
});

// Layer 3: Full Route Cache
export const dynamic = 'force-static'; // pre-render at build time

// Layer 4: Router Cache (automatic in App Router)
// No code needed — client caches visited routes automatically`}
        pagesRouterEquivalent="Pages Router had ISR (getStaticProps + revalidate) for data cache-like behavior, and a basic client-side route cache. Request memoization and the Full Route Cache are new to the App Router."
      />
    </div>
  );
}
