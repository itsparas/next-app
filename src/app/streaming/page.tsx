import { Suspense } from "react";
import { FeatureExplainer } from "@/components/feature-explainer";

// Three independently slow data fetches
async function SlowSection({
  delayMs,
  title,
  color,
}: {
  delayMs: number;
  title: string;
  color: string;
}) {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  const timestamp = new Date().toISOString();

  return (
    <div
      className={`rounded-xl border p-5 space-y-2 ${
        color === "indigo"
          ? "border-indigo-800/50 bg-indigo-950/20"
          : color === "green"
          ? "border-green-800/50 bg-green-950/20"
          : "border-amber-800/50 bg-amber-950/20"
      }`}
    >
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">
        Loaded after {delayMs}ms delay. Timestamp: {timestamp}
      </p>
    </div>
  );
}

function Skeleton({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 animate-pulse">
      <div className="h-5 w-32 bg-gray-800 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-800/50 rounded" />
      <p className="text-xs text-gray-600 mt-2">Waiting for {label}...</p>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Streaming + Suspense</h1>
      <p className="text-gray-400">
        Each section below wraps a slow data fetch in its own{" "}
        <code className="text-indigo-400">&lt;Suspense&gt;</code> boundary.
        Watch them pop in at different times (500ms, 1500ms, 3000ms).
      </p>

      <div className="space-y-4">
        <Suspense fallback={<Skeleton label="fast data (500ms)" />}>
          <SlowSection delayMs={500} title="Fast Section" color="indigo" />
        </Suspense>

        <Suspense fallback={<Skeleton label="medium data (1500ms)" />}>
          <SlowSection delayMs={1500} title="Medium Section" color="green" />
        </Suspense>

        <Suspense fallback={<Skeleton label="slow data (3000ms)" />}>
          <SlowSection delayMs={3000} title="Slow Section" color="amber" />
        </Suspense>
      </div>

      <FeatureExplainer
        featureId={11}
        title="Streaming + Suspense"
        what="Streaming lets the server send HTML in chunks. Each <Suspense> boundary defines a unit of streaming — the shell renders immediately, and each section streams in when its data is ready."
        whyHere="This page has three sections with intentionally different delays (500ms, 1500ms, 3000ms). Each has its own <Suspense> boundary so they appear independently."
        code={`// Manual Suspense boundaries for fine-grained streaming
<Suspense fallback={<Skeleton label="fast data" />}>
  <SlowSection delayMs={500} title="Fast Section" />
</Suspense>

<Suspense fallback={<Skeleton label="slow data" />}>
  <SlowSection delayMs={3000} title="Slow Section" />
</Suspense>

// SlowSection is an async Server Component:
async function SlowSection({ delayMs, title }) {
  await new Promise(resolve => setTimeout(resolve, delayMs));
  return <div>{title} — loaded!</div>;
}`}
        pagesRouterEquivalent="Pages Router had no streaming. The entire page waited for all data before any HTML was sent (getServerSideProps blocks the full page). loading.tsx does this automatically at the route level — this shows the manual, component-level version."
      />
    </div>
  );
}
