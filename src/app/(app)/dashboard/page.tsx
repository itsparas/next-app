import Link from "next/link";
import { ErrorTrigger } from "@/components/error-trigger";
import { FeatureExplainer } from "@/components/feature-explainer";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-300 hover:text-white transition-colors"
          >
            View Blog
          </Link>
          <Link
            href="/cache-lab"
            className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Cache Lab
          </Link>
          <Link
            href="/streaming"
            className="px-4 py-2 rounded-lg bg-gray-800 text-sm text-gray-300 hover:text-white transition-colors"
          >
            Streaming Demo
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-red-300">Error Demo</h2>
        <p className="text-sm text-gray-400">
          Click the button below to deliberately throw an error. The nearest{" "}
          <code className="text-red-400">error.tsx</code> boundary will catch
          it and show a recovery UI.
        </p>
        <ErrorTrigger />
      </div>

      <FeatureExplainer
        featureId={4}
        title="error.tsx"
        what="error.tsx is an error boundary that catches JavaScript errors in its route segment. When the 'Trigger Error' button throws, the error.tsx file at app/(app)/dashboard/error.tsx renders a fallback UI with a retry button."
        whyHere="Errors in the dashboard shouldn't crash the whole app. The error boundary is scoped to the dashboard segment, so the root layout and nav remain functional."
        code={`// app/(app)/dashboard/error.tsx
"use client"; // error.tsx must be a Client Component

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong: {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}`}
        pagesRouterEquivalent="Pages Router had no built-in error boundaries per route. You would use React ErrorBoundary components manually or handle errors in getServerSideProps."
      />
    </div>
  );
}
