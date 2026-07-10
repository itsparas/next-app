import { Suspense } from "react";
import { FeatureExplainer } from "@/components/feature-explainer";
import { getSession } from "@/lib/auth";
import { getAnalytics } from "@/lib/db";

// Dynamic personalized section — streams in after static shell
async function PersonalizedSection() {
  const session = await getSession();
  const stats = await getAnalytics();

  return (
    <div className="rounded-xl border border-emerald-800/50 bg-emerald-950/20 p-5 space-y-3">
      <h3 className="font-semibold text-emerald-300">
        Welcome back, {session?.username ?? "Guest"}
      </h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xl font-bold text-white">{stats.totalPosts}</p>
          <p className="text-xs text-gray-500">Posts</p>
        </div>
        <div>
          <p className="text-xl font-bold text-white">{stats.totalLikes}</p>
          <p className="text-xs text-gray-500">Likes</p>
        </div>
        <div>
          <p className="text-xl font-bold text-white">{stats.totalComments}</p>
          <p className="text-xs text-gray-500">Comments</p>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Top post: {stats.topPost} &middot; Live data streamed via PPR
      </p>
    </div>
  );
}

export default function PPRPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Static shell — pre-rendered and served instantly */}
      <h1 className="text-3xl font-bold">Partial Prerendering (PPR)</h1>
      <p className="text-gray-400">
        The heading, description, and layout below are the{" "}
        <strong className="text-white">static shell</strong> — pre-rendered at
        build time and served instantly from the CDN. The personalized section
        below streams in dynamically.
      </p>

      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
        <h3 className="font-semibold text-gray-200">Static Hero Section</h3>
        <p className="text-sm text-gray-400 mt-1">
          This content is part of the static shell. It appeared instantly because
          it was pre-rendered at build time. No waiting for data.
        </p>
      </div>

      {/* Dynamic section — streamed in */}
      <Suspense
        fallback={
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 animate-pulse space-y-3">
            <div className="h-5 w-48 bg-gray-800 rounded" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-800/50 rounded" />
              ))}
            </div>
          </div>
        }
      >
        <PersonalizedSection />
      </Suspense>

      <FeatureExplainer
        featureId={12}
        title="Partial Prerendering (PPR)"
        what="PPR combines the instant delivery of a static HTML shell (nav, layout, hero) with streamed dynamic content (user greeting, live stats). The static shell is served from the CDN cache immediately, while personalized sections are streamed in via Suspense boundaries after the initial response."
        whyHere="This page has both static content (heading, hero section) and dynamic personalized content (user greeting + stats). PPR renders the static parts at build time, then streams the dynamic parts on request — the best of SSG and SSR combined."
        code={`// app/ppr/page.tsx
export const experimental_ppr = true;

export default function PPRPage() {
  return (
    <div>
      {/* Static: pre-rendered at build time */}
      <h1>Partial Prerendering</h1>
      <StaticHeroSection />

      {/* Dynamic: streamed on request */}
      <Suspense fallback={<Skeleton />}>
        <PersonalizedSection />
      </Suspense>
    </div>
  );
}

// The Suspense boundary is the "PPR boundary" —
// everything outside it is static, everything inside streams.`}
        pagesRouterEquivalent="Pages Router forced a choice: SSG (getStaticProps — fully static) or SSR (getServerSideProps — fully dynamic). There was no way to combine both in a single page. PPR eliminates this tradeoff."
      />
    </div>
  );
}
