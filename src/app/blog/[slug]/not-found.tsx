import Link from "next/link";
import { FeatureExplainer } from "@/components/feature-explainer";

export default function PostNotFound() {
  return (
    <div className="max-w-xl mx-auto space-y-6 pt-12 text-center">
      <h1 className="text-4xl font-bold text-gray-600">Post not found</h1>
      <p className="text-gray-400">
        The blog post you are looking for does not exist. Try visiting a valid
        slug like{" "}
        <Link
          href="/blog/server-components-explained"
          className="text-indigo-400 underline"
        >
          /blog/server-components-explained
        </Link>
        .
      </p>
      <Link
        href="/blog"
        className="inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
      >
        Back to blog
      </Link>

      <FeatureExplainer
        featureId={4}
        title="not-found.tsx"
        what="This is a not-found.tsx boundary. When a Server Component calls notFound(), Next.js renders the nearest not-found.tsx in the file tree. This one lives at app/blog/[slug]/not-found.tsx."
        whyHere="If someone visits /blog/nonexistent-post, the page component calls notFound() and this file renders. It's colocated with the [slug] route so only blog post 404s get this treatment — the root not-found.tsx handles everything else."
        code={`// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }) {
  const post = await getPostBySlug(slug);
  if (!post) notFound(); // triggers this not-found.tsx
  // ...
}

// app/blog/[slug]/not-found.tsx
export default function PostNotFound() {
  return <div>Post not found</div>;
}`}
        pagesRouterEquivalent="In Pages Router, you would return { notFound: true } from getStaticProps/getServerSideProps, which would show pages/404.tsx. There was no nested not-found boundary."
      />
    </div>
  );
}
