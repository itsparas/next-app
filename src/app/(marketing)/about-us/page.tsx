export default function AboutUsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="text-gray-400 leading-relaxed max-w-2xl">
        DevNotes is a teaching tool disguised as a real application. Every route,
        layout, and component serves a dual purpose: it works as a real feature
        AND it teaches you how the App Router works.
      </p>
      <p className="text-gray-400 leading-relaxed max-w-2xl">
        This page is inside the <code className="text-indigo-400">(marketing)</code>{" "}
        route group. Notice the marketing sub-nav above — it is defined in{" "}
        <code className="text-indigo-400">app/(marketing)/layout.tsx</code> and
        shared by /landing, /pricing, and /about-us. The URL shows /about-us, not
        /(marketing)/about-us.
      </p>
    </div>
  );
}
