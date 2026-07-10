import { loginAction } from "@/lib/actions";
import { FeatureExplainer } from "@/components/feature-explainer";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-6 pt-12">
      <h1 className="text-2xl font-bold">Login</h1>
      <p className="text-gray-400 text-sm">
        This is a mock login — click below to set a fake auth cookie as
        &quot;Demo User&quot;. This is enough to demonstrate protected routes
        and auth checks in Server Actions and middleware.
      </p>

      <form action={loginAction}>
        <button
          type="submit"
          className="w-full px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors"
        >
          Login as Demo User
        </button>
      </form>

      <FeatureExplainer
        featureId={13}
        title="Auth & Middleware"
        what="The /dashboard/* routes are protected by middleware.ts. If you're not logged in and try to visit /dashboard, you'll be redirected here."
        whyHere="Login sets a cookie. middleware.ts reads that cookie before any page renders and redirects unauthenticated users."
        code={`// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.cookies.get("devnotes-auth");
  if (!auth && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};`}
        pagesRouterEquivalent="In Pages Router you would use getServerSideProps to check auth on each page, or a custom _middleware.ts (which became middleware.ts in Next.js 12+)."
      />
    </div>
  );
}
