import { Suspense } from "react";
import { connection } from "next/server";
import { FeatureExplainer } from "@/components/feature-explainer";

// Feature 10: "use cache" directive
async function CachedTimestamp() {
  "use cache";

  // This component's output is cached — it won't re-run on every request
  const timestamp = new Date().toISOString();
  const randomValue = Math.random().toFixed(6);

  return (
    <div className="rounded-xl border border-cyan-800/50 bg-cyan-950/20 p-5 space-y-3">
      <h3 className="font-semibold text-cyan-300">Cached Component Output</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded bg-gray-800/50 p-3">
          <p className="text-xs text-gray-500">Cached timestamp</p>
          <p className="text-gray-300 font-mono text-sm">{timestamp}</p>
        </div>
        <div className="rounded bg-gray-800/50 p-3">
          <p className="text-xs text-gray-500">Cached random</p>
          <p className="text-gray-300 font-mono text-sm">{randomValue}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Refresh the page multiple times. These values stay the same because
        the component is marked with <code>&quot;use cache&quot;</code> — its
        rendered output is cached.
      </p>
    </div>
  );
}

async function UncachedTimestamp() {
  await connection(); // opt into dynamic rendering
  const timestamp = new Date().toISOString();
  const randomValue = Math.random().toFixed(6);

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 space-y-3">
      <h3 className="font-semibold text-gray-300">
        Uncached Component (for comparison)
      </h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded bg-gray-800/50 p-3">
          <p className="text-xs text-gray-500">Fresh timestamp</p>
          <p className="text-gray-300 font-mono text-sm">{timestamp}</p>
        </div>
        <div className="rounded bg-gray-800/50 p-3">
          <p className="text-xs text-gray-500">Fresh random</p>
          <p className="text-gray-300 font-mono text-sm">{randomValue}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        This component has no cache directive — it re-renders on every request.
      </p>
    </div>
  );
}

export default function CacheComponentPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">&quot;use cache&quot; Components</h1>
      <p className="text-gray-400">
        The <code className="text-cyan-400">&quot;use cache&quot;</code>{" "}
        directive lets you explicitly mark a component or function as cacheable.
        Compare the two sections below.
      </p>

      <CachedTimestamp />
      <Suspense
        fallback={
          <div className="h-40 rounded-xl bg-gray-800/30 animate-pulse" />
        }
      >
        <UncachedTimestamp />
      </Suspense>

      <FeatureExplainer
        featureId={10}
        title='Cache Components ("use cache")'
        what={`"use cache" is a directive (like "use client" or "use server") that explicitly marks a component or function as cacheable. Its rendered output is cached and reused across requests. This is the newer, explicit alternative to relying on fetch() config for caching.`}
        whyHere="The CachedTimestamp component above uses 'use cache' — its timestamp and random value stay the same across page refreshes. The UncachedTimestamp component has no directive and generates fresh values every time."
        code={`// Explicit caching with "use cache"
async function CachedTimestamp() {
  "use cache"; // ← the magic directive

  const timestamp = new Date().toISOString();
  return <div>{timestamp}</div>;
  // This output is cached — same value on every request
}

// Compare with implicit fetch-based caching:
async function ImplicitlyCached() {
  const res = await fetch(url, { next: { revalidate: 60 } });
  // Caching is configured per-fetch, not per-component
}`}
        pagesRouterEquivalent="Pages Router had no component-level caching directive. The closest equivalent was getStaticProps with revalidate for ISR, which cached the entire page — not individual components."
      />
    </div>
  );
}
