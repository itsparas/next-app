import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug, getAllSlugs, getCommentsByPostId } from "@/lib/db";
import { LikeButton } from "@/components/like-button";
import { Sidebar } from "@/components/sidebar";
import { CommentForm } from "@/components/comment-form";
import { FeatureExplainer } from "@/components/feature-explainer";
import { getSession } from "@/lib/auth";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Feature 5: generateStaticParams — pre-render known posts
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Feature 5: generateMetadata — dynamic per-post metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — DevNotes`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Server Component that fetches comments
async function CommentList({ postId }: { postId: string }) {
  const comments = await getCommentsByPostId(postId);
  return (
    <div className="space-y-3">
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c.id}
            className="rounded-lg bg-gray-800/50 px-3 py-2 text-sm"
          >
            <span className="font-medium text-indigo-300">{c.author}</span>
            <p className="text-gray-300 mt-1">{c.text}</p>
          </div>
        ))
      )}
    </div>
  );
}

// Feature 14: Async params
export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const session = await getSession();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main content — Server Component */}
        <article className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-400 mt-2 text-sm">
              By {post.author} &middot;{" "}
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="h-48 rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 flex items-center justify-center text-gray-500">
            Post hero image
          </div>

          <p className="text-gray-300 leading-relaxed">{post.content}</p>

          {/* Feature 1: Client Component nested in Server Component */}
          <div className="flex items-center gap-4">
            <LikeButton postId={post.id} initialLikes={post.likes} />
          </div>

          <FeatureExplainer
            featureId={1}
            title="Server Components vs Client Components"
            what="This entire page is a Server Component — it fetches data with await directly on the server. The LikeButton above is a Client Component (marked 'use client') that receives initialLikes as a prop and handles interactivity in the browser."
            whyHere="Post content doesn't need interactivity — it's pure read data, so it stays as a Server Component (zero JS shipped). The Like button needs useState and onClick, so it must be a Client Component."
            code={`// This file: app/blog/[slug]/page.tsx — Server Component (default)
export default async function PostDetailPage({ params }: Props) {
  const post = await getPostBySlug(slug); // runs on server
  return (
    <article>
      <p>{post.content}</p>
      {/* Client Component nested in Server Component */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  );
}

// components/like-button.tsx — Client Component
"use client";
export function LikeButton({ postId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  // ... interactive logic
}`}
            pagesRouterEquivalent="In Pages Router, everything was a Client Component by default. You had to use getStaticProps/getServerSideProps to run server code, and the component always shipped JS to the browser."
          />

          <FeatureExplainer
            featureId={2}
            title="Server Actions — Like & Comment"
            what="The Like button uses useTransition to call a Server Action (likePostAction) with optimistic UI. The Comment form below uses useActionState for validation errors and pending state."
            whyHere="Both are mutations. The Like action is fire-and-forget with instant optimistic feedback. The Comment form needs to show server-side validation errors, so useActionState tracks the full action lifecycle."
            code={`// Like with useTransition (optimistic)
function handleLike() {
  setLikes(prev => prev + 1); // optimistic
  startTransition(async () => {
    const serverCount = await likePostAction(postId);
    setLikes(serverCount); // reconcile
  });
}

// Comment with useActionState
const [state, formAction, isPending] = useActionState(
  addCommentAction, initialState
);
// state.errors shows Zod validation errors from the server`}
            pagesRouterEquivalent="Pages Router: fetch('/api/likes', { method: 'POST' }) from the client. Server Actions eliminate the API route boilerplate."
          />

          <FeatureExplainer
            featureId={5}
            title="generateStaticParams + generateMetadata"
            what="This page uses generateStaticParams to pre-render all known post slugs at build time (like getStaticPaths). generateMetadata produces per-post <title> and OG tags dynamically."
            whyHere="Blog posts are the classic use case for static generation with dynamic metadata. Each post gets its own <title> for SEO, and known posts are pre-rendered for performance."
            code={`// Pre-render known posts
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

// Dynamic metadata per post
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title + " — DevNotes",
    openGraph: { title: post.title },
  };
}`}
            pagesRouterEquivalent="getStaticPaths + getStaticProps for pre-rendering. next/head or a custom Head component for metadata. generateMetadata replaces both next/head and the metadata workaround."
          />

          <FeatureExplainer
            featureId={14}
            title="Async params"
            what="In Next.js 15+, the params prop is a Promise that must be awaited: const { slug } = await params. This is a breaking change from earlier versions where params was a plain object."
            whyHere="This page uses a dynamic [slug] route segment. The await is required because params resolution is asynchronous in the App Router's streaming architecture."
            code={`type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params; // Must await!
  const post = await getPostBySlug(slug);
  // ...
}`}
            pagesRouterEquivalent="In Pages Router, params were available synchronously as context.params in getStaticProps/getServerSideProps."
          />
        </article>

        {/* Feature 1: Sidebar (Client Component) wrapping CommentList (Server Component as children) */}
        <div className="space-y-4">
          <Sidebar title="Comments">
            <Suspense
              fallback={
                <div className="text-gray-500 text-sm animate-pulse">
                  Loading comments...
                </div>
              }
            >
              <CommentList postId={post.id} />
            </Suspense>
          </Sidebar>

          {session && <CommentForm postId={post.id} />}
        </div>
      </div>
    </div>
  );
}
