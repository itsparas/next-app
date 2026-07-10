import Link from "next/link";
import { getPostBySlug } from "@/lib/db";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PhotoModal({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-gray-900 border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h2 className="font-semibold text-white">{post.title}</h2>
          <Link
            href="/blog"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Close
          </Link>
        </div>

        <div className="aspect-video bg-gradient-to-br from-indigo-900/50 to-purple-900/50 flex items-center justify-center text-gray-400">
          Modal photo view for &quot;{post.title}&quot;
        </div>

        <div className="px-4 py-3 text-sm text-gray-400">
          <p>
            This is a <strong className="text-indigo-300">modal overlay</strong>{" "}
            rendered via an intercepted route. The blog list is still behind
            this modal. Try opening{" "}
            <span className="text-indigo-400 font-mono text-xs">
              /blog/photo/{slug}
            </span>{" "}
            in a new tab to see the full standalone page instead.
          </p>
        </div>
      </div>
    </div>
  );
}
