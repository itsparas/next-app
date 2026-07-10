import Link from "next/link";
import { getAllPosts } from "@/lib/db";
import { NewPostForm } from "@/components/new-post-form";
import { FeatureExplainer } from "@/components/feature-explainer";
import { getSession } from "@/lib/auth";

type Props = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function BlogListPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const sortOrder = (sort === "oldest" || sort === "popular") ? sort : "newest";
  const posts = await getAllPosts(sortOrder);
  const session = await getSession();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog</h1>
        <div className="flex gap-2 text-sm">
          {(["newest", "oldest", "popular"] as const).map((s) => (
            <Link
              key={s}
              href={`/blog?sort=${s}`}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                sortOrder === s
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      <FeatureExplainer
        featureId={14}
        title="Async searchParams"
        what="In Next.js 15+, searchParams is a Promise that must be awaited. This page reads ?sort= to control the post order."
        whyHere="The sort buttons above update the URL searchParams. The server component awaits them and passes the sort to the data layer."
        code={`// app/blog/page.tsx
type Props = {
  searchParams: Promise<{ sort?: string }>;
};

export default async function BlogListPage({ searchParams }: Props) {
  const { sort } = await searchParams;
  const posts = await getAllPosts(sort as any);
  // ...
}`}
        pagesRouterEquivalent="In Pages Router, searchParams were available synchronously via context.query in getServerSideProps, or via useRouter().query on the client."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden group"
          >
            <Link href={`/blog/photo/${post.slug}`}>
              <div className="h-32 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center text-gray-500 text-xs cursor-pointer group-hover:from-indigo-800/50 group-hover:to-purple-800/50 transition-colors">
                Click for photo modal
              </div>
            </Link>
            <div className="p-4 space-y-2">
              <Link href={`/blog/${post.slug}`}>
                <h2 className="font-semibold text-white hover:text-indigo-300 transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-400">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{post.author}</span>
                <span>{post.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FeatureExplainer
        featureId={8}
        title="Intercepting Routes"
        what="Clicking a post thumbnail above opens a modal overlay via an intercepted route. The URL changes to /blog/photo/[slug], but the blog list stays rendered behind the modal. If you open that same URL in a new tab (hard navigation), you'll see the full standalone photo page instead."
        whyHere="This is the Instagram-like pattern: soft nav shows a modal; hard nav shows a full page. The intercepted route is defined at app/blog/@modal/(..)blog/photo/[slug]/page.tsx."
        code={`// Folder structure:
// app/blog/@modal/(..)blog/photo/[slug]/page.tsx  ← intercepted (modal)
// app/blog/photo/[slug]/page.tsx                   ← full page

// The (..) convention means "go up one segment" to match the
// /blog/photo/[slug] route, but render it inside the @modal slot.`}
        pagesRouterEquivalent="Pages Router had no built-in intercepting routes. You would manually manage modal state with query params (e.g., ?photo=slug) and conditionally render a modal."
      />

      {session && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">New Post</h2>
          <NewPostForm />

          <FeatureExplainer
            featureId={2}
            title="Server Actions — New Post Form"
            what="This form's action attribute points directly to a Server Action (an async function marked 'use server'). When submitted, the browser sends a POST to the server without client-side JS being required — this is progressive enhancement."
            whyHere="Creating a post is a mutation. Server Actions are the App Router way to handle form submissions and data mutations. Zod validates input on the server side. Auth is checked inside the action itself."
            code={`// lib/actions.ts (excerpt)
"use server";
import { z } from "zod/v4";

const NewPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(10),
  content: z.string().min(20),
});

export async function createPostAction(
  _prevState: ActionState,
  formData: FormData
) {
  const session = await getSession();
  if (!session) return { success: false, errors: ["Not logged in"] };

  const result = NewPostSchema.safeParse({
    title: formData.get("title"),
    // ...
  });
  // ... validation, then createPost(...)
}`}
            pagesRouterEquivalent="In Pages Router you would create an API route (pages/api/posts.ts) and call it with fetch() from the client. Server Actions eliminate that boilerplate."
          />
        </div>
      )}
    </div>
  );
}
