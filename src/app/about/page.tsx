import { FeatureExplainer } from "@/components/feature-explainer";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">About DevNotes</h1>
      <p className="text-gray-400 leading-relaxed">
        DevNotes is a teaching playground built with{" "}
        <strong className="text-white">Next.js 16</strong>, the App Router, and
        Turbopack. Every page demonstrates a real feature and explains it inline.
      </p>

      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 space-y-3">
        <h2 className="text-xl font-semibold">Tech Stack</h2>
        <ul className="text-sm text-gray-400 space-y-1.5">
          <li>Next.js 16.x — App Router, Turbopack (default)</li>
          <li>React 19 — Server Components, useActionState, useTransition</li>
          <li>TypeScript 5 — strict mode</li>
          <li>Tailwind CSS 4 — utility-first styling</li>
          <li>Zod 4 — schema validation in Server Actions</li>
          <li>In-memory data layer — async functions simulating DB calls</li>
        </ul>
      </div>

      <FeatureExplainer
        featureId={15}
        title="Turbopack"
        what="Turbopack is the Rust-based bundler that replaced Webpack as the default dev server bundler in Next.js 16. It provides significantly faster HMR and cold start times by leveraging incremental computation and native-speed processing."
        whyHere="Every page in this app is served through Turbopack during development. You are using it right now when you run `next dev`. In production (`next build`), the build pipeline uses the standard Next.js compiler."
        code={`// package.json — Turbopack is the default, no flag needed in v16
{
  "scripts": {
    "dev": "next dev --turbopack"
  }
}

// In Next.js 15, --turbopack was opt-in.
// In Next.js 16, Turbopack is the default dev bundler.`}
        pagesRouterEquivalent="Pages Router used Webpack for both dev and build. Turbopack replaces only the dev bundler. There is no Pages Router equivalent — Turbopack is an infrastructure-level improvement."
      />
    </div>
  );
}
