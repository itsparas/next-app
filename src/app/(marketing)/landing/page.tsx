import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Write. Share. Learn.
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          DevNotes is a developer blog platform built to demonstrate every
          feature of the Next.js App Router.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
          >
            Read the blog
          </Link>
          <Link
            href="/feature-map"
            className="px-6 py-3 rounded-lg border border-gray-700 text-gray-300 font-medium hover:border-gray-600 hover:text-white transition-colors"
          >
            Explore features
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          {
            title: "Server-First",
            desc: "Server Components by default. Ship zero JS for static content.",
          },
          {
            title: "Progressive",
            desc: "Forms work without JS. Server Actions handle mutations.",
          },
          {
            title: "Fast",
            desc: "Turbopack dev server, streaming, and partial prerendering.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-800 bg-gray-900/50 p-6"
          >
            <h3 className="font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
