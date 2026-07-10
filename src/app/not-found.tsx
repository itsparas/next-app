import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 className="text-6xl font-bold text-gray-700">404</h1>
      <p className="text-gray-400">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
