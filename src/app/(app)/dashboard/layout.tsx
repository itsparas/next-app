import { FeatureExplainer } from "@/components/feature-explainer";

export default function DashboardLayout({
  children,
  analytics,
  activity,
}: {
  readonly children: React.ReactNode;
  readonly analytics: React.ReactNode;
  readonly activity: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Feature 7: Parallel routes render side by side */}
      <div className="grid md:grid-cols-2 gap-4">
        {analytics}
        {activity}
      </div>

      <FeatureExplainer
        featureId={7}
        title="Parallel Routes"
        what="The Analytics and Activity panels above are parallel route slots (@analytics and @activity). Each has its own page.tsx and loading.tsx, and they render independently — one can still be loading while the other has already resolved."
        whyHere="The dashboard naturally has multiple independent data sections. Parallel routes let each section stream in at its own pace with its own error and loading boundaries."
        code={`// Folder structure:
// app/(app)/dashboard/layout.tsx ← receives analytics + activity as props
// app/(app)/dashboard/@analytics/page.tsx
// app/(app)/dashboard/@analytics/loading.tsx
// app/(app)/dashboard/@activity/page.tsx
// app/(app)/dashboard/@activity/loading.tsx

// layout.tsx
export default function DashboardLayout({
  children, analytics, activity
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {analytics}  {/* renders @analytics/page.tsx */}
        {activity}   {/* renders @activity/page.tsx */}
      </div>
      {children}
    </div>
  );
}`}
        pagesRouterEquivalent="Pages Router had no parallel routes. You would use multiple useEffect calls or React Query hooks in a single page component, managing loading states manually for each data source."
      />

      <FeatureExplainer
        featureId={4}
        title="Nested Layouts"
        what="This dashboard uses a nested layout. The root layout provides the global nav. The (app) route group layout adds a sidebar. This dashboard layout adds the parallel route slots and dashboard-specific content."
        whyHere="Dashboard pages share a common structure (heading, slot grid) that other pages don't need. Nested layouts compose automatically — you don't manually wrap components."
        code={`// Layout nesting chain:
// app/layout.tsx          → <Nav /> + <main>
//   app/(app)/layout.tsx  → sidebar + content area
//     app/(app)/dashboard/layout.tsx → heading + parallel slots
//       app/(app)/dashboard/page.tsx → dashboard content`}
        pagesRouterEquivalent="Pages Router used a single _app.tsx. For nested layouts, you had to implement a getLayout pattern or use per-page layout wrappers manually."
      />

      {children}
    </div>
  );
}
