export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Settings</h2>
      <p className="text-gray-400 text-sm">
        This is a nested route under /dashboard. It shares the dashboard layout
        (sidebar, heading) via the nested layout chain. Settings content appears
        where <code className="text-indigo-400">children</code> is rendered in
        the dashboard layout.
      </p>
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 space-y-3">
        <h3 className="font-medium text-gray-200">Preferences</h3>
        <p className="text-sm text-gray-500">
          These settings are for demonstration only.
        </p>
      </div>
    </div>
  );
}
