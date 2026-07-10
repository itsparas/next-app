// In-memory data layer — structured like real async DB calls

export type Post = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly content: string;
  readonly author: string;
  readonly imageUrl: string;
  readonly createdAt: string;
  readonly likes: number;
};

export type Comment = {
  readonly id: string;
  readonly postId: string;
  readonly author: string;
  readonly text: string;
  readonly createdAt: string;
};

const posts: Post[] = [
  {
    id: "1",
    slug: "server-components-explained",
    title: "Server Components Explained",
    excerpt: "Understanding the default rendering model in Next.js App Router.",
    content:
      "Server Components are the default in the App Router. They render on the server and send HTML to the client — no JavaScript bundle is shipped for them. This means you can directly await database calls, access the file system, and use server-only APIs right inside your component. Client Components, marked with 'use client', are the interactive counterpart — they hydrate on the browser and can use hooks like useState and useEffect.",
    author: "Demo User",
    imageUrl: "/images/server-components.svg",
    createdAt: "2026-06-15T10:00:00Z",
    likes: 42,
  },
  {
    id: "2",
    slug: "mastering-server-actions",
    title: "Mastering Server Actions",
    excerpt: "Forms, mutations, and progressive enhancement in Next.js.",
    content:
      "Server Actions let you define async functions that run on the server, callable directly from your JSX via form actions or event handlers. They compile down to POST endpoints automatically. Because they are server-side, you must validate inputs (e.g., with Zod) and check authentication inside them — the client cannot be trusted. They support progressive enhancement: forms work even before JavaScript loads.",
    author: "Demo User",
    imageUrl: "/images/server-actions.svg",
    createdAt: "2026-06-20T14:30:00Z",
    likes: 38,
  },
  {
    id: "3",
    slug: "caching-deep-dive",
    title: "Caching Deep Dive",
    excerpt: "The four layers of caching in Next.js and how to control them.",
    content:
      "Next.js has four caching layers: Request Memoization (deduplicates identical fetches within a single render), the Data Cache (persists fetch results across requests with revalidation), the Full Route Cache (caches rendered HTML/RSC payload at build time), and the Router Cache (client-side cache for instant back/forward navigation). Understanding when each layer kicks in — and how to opt out — is the key to predictable data freshness.",
    author: "Demo User",
    imageUrl: "/images/caching.svg",
    createdAt: "2026-07-01T09:00:00Z",
    likes: 55,
  },
  {
    id: "4",
    slug: "streaming-and-suspense",
    title: "Streaming and Suspense",
    excerpt: "How to progressively render your UI with Suspense boundaries.",
    content:
      "Streaming lets the server send HTML in chunks as data becomes available. Wrap slow components in <Suspense> with a fallback, and the shell renders immediately while the slow part streams in later. This is what loading.tsx does automatically at the route level — but you can place Suspense boundaries anywhere for fine-grained control over which parts of your page appear first.",
    author: "Demo User",
    imageUrl: "/images/streaming.svg",
    createdAt: "2026-07-05T16:00:00Z",
    likes: 29,
  },
  {
    id: "5",
    slug: "partial-prerendering",
    title: "Partial Prerendering (PPR)",
    excerpt: "Combining static shells with dynamic, personalized content.",
    content:
      "PPR is an experimental rendering strategy that combines the instant delivery of static HTML with streamed dynamic content. The static shell (nav, layout, hero) is served from the CDN cache instantly, while personalized or real-time sections (user greeting, live stats) are streamed in via Suspense boundaries. It is the best of both SSG and SSR — fast initial load with fresh data where it matters.",
    author: "Demo User",
    imageUrl: "/images/ppr.svg",
    createdAt: "2026-07-08T11:00:00Z",
    likes: 67,
  },
];

const comments: Comment[] = [
  {
    id: "c1",
    postId: "1",
    author: "Alice",
    text: "Great explanation of the mental model!",
    createdAt: "2026-06-16T08:00:00Z",
  },
  {
    id: "c2",
    postId: "1",
    author: "Bob",
    text: "This cleared up my confusion about 'use client'.",
    createdAt: "2026-06-17T12:00:00Z",
  },
  {
    id: "c3",
    postId: "2",
    author: "Charlie",
    text: "The Zod validation tip is super helpful.",
    createdAt: "2026-06-21T09:30:00Z",
  },
  {
    id: "c4",
    postId: "3",
    author: "Diana",
    text: "Caching is the hardest part. Thanks for breaking it down.",
    createdAt: "2026-07-02T15:00:00Z",
  },
];

// Simulate network delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let nextPostId = 6;
let nextCommentId = 5;

// ─── Post queries ─────────────────────────────────────────

export async function getAllPosts(
  sort: "newest" | "oldest" | "popular" = "newest"
): Promise<readonly Post[]> {
  await delay(800); // simulate DB latency
  const sorted = [...posts];
  switch (sort) {
    case "oldest":
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
    case "popular":
      sorted.sort((a, b) => b.likes - a.likes);
      break;
    default:
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
  return sorted;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  await delay(300);
  return posts.find((p) => p.slug === slug);
}

export async function getPostById(id: string): Promise<Post | undefined> {
  await delay(200);
  return posts.find((p) => p.id === id);
}

export async function getAllSlugs(): Promise<readonly string[]> {
  return posts.map((p) => p.slug);
}

export async function createPost(
  data: Omit<Post, "id" | "createdAt" | "likes">
): Promise<Post> {
  await delay(500);
  const post: Post = {
    ...data,
    id: String(nextPostId++),
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  posts.push(post);
  return post;
}

export async function likePost(id: string): Promise<number> {
  await delay(200);
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error("Post not found");
  // Immutable update in the mutable store (for demo simplicity)
  const idx = posts.indexOf(post);
  const updated = { ...post, likes: post.likes + 1 };
  posts[idx] = updated;
  return updated.likes;
}

// ─── Comment queries ──────────────────────────────────────

export async function getCommentsByPostId(
  postId: string
): Promise<readonly Comment[]> {
  await delay(400);
  return comments.filter((c) => c.postId === postId);
}

export async function createComment(
  data: Omit<Comment, "id" | "createdAt">
): Promise<Comment> {
  await delay(300);
  const comment: Comment = {
    ...data,
    id: `c${nextCommentId++}`,
    createdAt: new Date().toISOString(),
  };
  comments.push(comment);
  return comment;
}

// ─── Stats (for dashboard) ────────────────────────────────

export async function getAnalytics(): Promise<{
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  topPost: string;
}> {
  await delay(1500); // slow on purpose for parallel route demo
  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const topPost = [...posts].sort((a, b) => b.likes - a.likes)[0];
  return {
    totalPosts: posts.length,
    totalComments: comments.length,
    totalLikes,
    topPost: topPost.title,
  };
}

export async function getRecentActivity(): Promise<
  readonly { action: string; detail: string; time: string }[]
> {
  await delay(2000); // even slower for demo
  return [
    { action: "New comment", detail: "Alice on Server Components", time: "2m ago" },
    { action: "Post liked", detail: "Caching Deep Dive +1", time: "5m ago" },
    { action: "New post", detail: "PPR published", time: "1h ago" },
    { action: "Comment liked", detail: "Bob's comment +1", time: "2h ago" },
    { action: "New comment", detail: "Diana on Caching", time: "3h ago" },
  ];
}

// ─── Cache lab helpers ────────────────────────────────────

let requestCounter = 0;

export async function getMemoizableData(): Promise<{
  value: number;
  callId: number;
}> {
  requestCounter++;
  await delay(100);
  return { value: Math.random(), callId: requestCounter };
}

export async function getTimestamp(): Promise<string> {
  await delay(100);
  return new Date().toISOString();
}
