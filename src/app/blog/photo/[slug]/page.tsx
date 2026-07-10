import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/db";
import { FeatureExplainer } from "@/components/feature-explainer";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PhotoFullPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        href="/blog"
        className="text-sm text-indigo-400 hover:text-indigo-300"
      >
        &larr; Back to blog
      </Link>

      <h1 className="text-2xl font-bold">{post.title} — Photo</h1>

      <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center text-gray-400">
        Full standalone photo page for &quot;{post.title}&quot;
      </div>

      <p className="text-gray-400 text-sm">
        You are viewing the <strong className="text-white">full page</strong>{" "}
        version. This is what renders on a hard navigation (direct URL or new
        tab). If you had clicked the thumbnail from the blog list, you would
        have seen a modal overlay instead.
      </p>

      <FeatureExplainer
        featureId={8}
        title="Intercepting Routes — Full Page"
        what="This is the non-intercepted version of the photo route. When you navigate here via a hard refresh or direct URL, Next.js renders this full page. When you soft-navigate from the blog list, the intercepted route renders a modal instead."
        whyHere="The two-path pattern (modal on soft nav, full page on hard nav) is achieved by having both app/blog/photo/[slug]/page.tsx (this file) and app/blog/@modal/(..)blog/photo/[slug]/page.tsx (the intercepted version)."
        code={`// Full page: app/blog/photo/[slug]/page.tsx
// This file — renders on hard navigation

// Intercepted: app/blog/@modal/(..)blog/photo/[slug]/page.tsx
// Renders as modal on soft navigation from /blog

// Try: click thumbnail on /blog → modal
// Try: open /blog/photo/server-components-explained in new tab → this page`}
        pagesRouterEquivalent="Pages Router had no route interception. You would use query params (?modal=photo&slug=...) and conditionally render a modal overlay client-side."
      />
    </div>
  );
}
