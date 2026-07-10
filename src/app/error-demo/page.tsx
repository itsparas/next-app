import { FeatureExplainer } from "@/components/feature-explainer";
import { ErrorTrigger } from "@/components/error-trigger";

export default function ErrorDemoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Error Boundary Demo</h1>
      <p className="text-gray-400">
        Click the button below to throw a client-side error. The nearest{" "}
        <code className="text-red-400">error.tsx</code> boundary catches it.
        Since this page has no local error.tsx, it bubbles up to the root error
        boundary.
      </p>

      <ErrorTrigger />

      <FeatureExplainer
        featureId={4}
        title="error.tsx Boundaries"
        what="error.tsx files act as React error boundaries scoped to route segments. When a component throws, the nearest error.tsx renders a fallback with a reset function. The rest of the app (layout, nav) remains functional."
        whyHere="This standalone demo page lets you trigger errors without affecting the dashboard. The dashboard has its own error.tsx at app/(app)/dashboard/error.tsx."
        code={`// error.tsx must be a Client Component
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>{error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
        pagesRouterEquivalent="Pages Router had no built-in per-route error boundaries. You would use React's ErrorBoundary class component or a library like react-error-boundary."
      />
    </div>
  );
}
