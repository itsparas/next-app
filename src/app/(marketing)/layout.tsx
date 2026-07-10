import Link from "next/link";
import { FeatureExplainer } from "@/components/feature-explainer";

export default function MarketingLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-6 border-b border-gray-800 pb-4 mb-8">
        <span className="text-sm font-semibold text-indigo-400 uppercase tracking-wider">
          Marketing
        </span>
        <nav className="flex gap-4 text-sm">
          <Link
            href="/landing"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Landing
          </Link>
          <Link
            href="/pricing"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about-us"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </Link>
        </nav>
      </div>

      {children}

      <FeatureExplainer
        featureId={6}
        title="Route Groups"
        what="This marketing section uses a (marketing) route group. The folder is named (marketing) with parentheses — this affects the layout but NOT the URL. The URL is /landing, not /(marketing)/landing."
        whyHere="The marketing pages share a different layout (this simpler nav) from the dashboard area which uses (app) route group with its own sidebar layout. Route groups let you organize routes by concern without affecting URLs."
        code={`// Folder structure:
// app/(marketing)/layout.tsx   ← this layout (marketing nav)
// app/(marketing)/landing/page.tsx  → URL: /landing
// app/(marketing)/pricing/page.tsx  → URL: /pricing
// app/(marketing)/about-us/page.tsx → URL: /about-us
//
// app/(app)/layout.tsx         ← different layout (sidebar)
// app/(app)/dashboard/page.tsx → URL: /dashboard
//
// Note: the URL has NO trace of (marketing) or (app)`}
        pagesRouterEquivalent="Pages Router had no route groups. You would use separate layout wrapper components and manually apply them to each page, or use a complex nested _app.tsx pattern."
      />
    </div>
  );
}
