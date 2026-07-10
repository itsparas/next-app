import Link from "next/link";
import { ProgressChecklist } from "@/components/progress-checklist";

const features = [
  {
    id: 1,
    title: "Server vs Client Components",
    route: "/blog/server-components-explained",
    description:
      "Post detail is a Server Component; LikeButton is a Client Component nested inside it. Sidebar (client) wraps server-rendered CommentList as children.",
  },
  {
    id: 2,
    title: "Server Actions",
    route: "/blog",
    description:
      "New Post form uses a Server Action as form action. Comment form uses useActionState. Like button uses useTransition for optimistic updates.",
  },
  {
    id: 3,
    title: "Route Handlers",
    route: "/api/posts/1",
    description:
      "REST-style GET/POST endpoint at /api/posts/[id]. Contrast with Server Actions for when each is appropriate.",
  },
  {
    id: 4,
    title: "Layouts, loading, error, not-found",
    route: "/dashboard",
    description:
      "Root layout with nav, nested dashboard layout with sidebar. loading.tsx on blog list, error.tsx with trigger button, not-found for invalid slugs.",
  },
  {
    id: 5,
    title: "Dynamic routes + generateStaticParams + generateMetadata",
    route: "/blog/server-components-explained",
    description:
      "Blog post pages use [slug] dynamic route with pre-rendered known posts and dynamic OG metadata.",
  },
  {
    id: 6,
    title: "Route groups",
    route: "/landing",
    description:
      "(marketing) group for public pages, (app) group for dashboard — different layouts, URL unaffected by group name.",
  },
  {
    id: 7,
    title: "Parallel routes",
    route: "/dashboard",
    description:
      "@analytics and @activity slots render independently side by side, each with its own loading state.",
  },
  {
    id: 8,
    title: "Intercepting routes",
    route: "/blog",
    description:
      "Click a post thumbnail to see a modal overlay (intercepted route). Open the same link in a new tab to see the full standalone page.",
  },
  {
    id: 9,
    title: "Caching model (4 layers)",
    route: "/cache-lab",
    description:
      "Request memoization, Data Cache with revalidation, Full Route Cache, and Router Cache — all demonstrated interactively.",
  },
  {
    id: 10,
    title: 'Cache Components ("use cache")',
    route: "/cache-component",
    description:
      'Explicit "use cache" directive as the newer alternative to implicit fetch-config caching.',
  },
  {
    id: 11,
    title: "Streaming + Suspense",
    route: "/streaming",
    description:
      "Multiple Suspense boundaries with staggered data fetches, each section popping in at different times.",
  },
  {
    id: 12,
    title: "Partial Prerendering (PPR)",
    route: "/ppr",
    description:
      "Static shell appears instantly; dynamic personalized section streams in via Suspense.",
  },
  {
    id: 13,
    title: "Middleware / proxy.ts",
    route: "/login",
    description:
      "proxy.ts protects /dashboard/* — redirects to /login if auth cookie is missing. Runs at the edge before the app.",
  },
  {
    id: 14,
    title: "Async params / searchParams",
    route: "/blog?sort=popular",
    description:
      "Blog list reads searchParams (Promise) for sort/filter. Post detail awaits params for the slug.",
  },
  {
    id: 15,
    title: "Turbopack",
    route: "/about",
    description:
      "Turbopack is the default bundler in Next.js 16. Dev info page explains what changed from Webpack.",
  },
];

export default function FeatureMapPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Feature Map</h1>
        <p className="text-gray-400 mt-2">
          All 15 App Router features demonstrated in this app. Click any to jump
          directly to the live demo.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <div className="space-y-3">
          {features.map((f) => (
            <Link
              key={f.id}
              href={f.route}
              className="group block rounded-lg border border-gray-800 bg-gray-900/50 p-4 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold mt-0.5">
                  {f.id}
                </span>
                <div>
                  <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{f.description}</p>
                  <span className="inline-block mt-2 text-xs text-indigo-400 font-mono">
                    {f.route}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <ProgressChecklist />
          </div>
        </div>
      </div>
    </div>
  );
}
