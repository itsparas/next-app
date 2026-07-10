"use client";

import { useState } from "react";

const FEATURES = [
  { id: 1, label: "Server vs Client Components" },
  { id: 2, label: "Server Actions" },
  { id: 3, label: "Route Handlers" },
  { id: 4, label: "Layouts / loading / error / not-found" },
  { id: 5, label: "Dynamic routes + generateStaticParams + generateMetadata" },
  { id: 6, label: "Route groups" },
  { id: 7, label: "Parallel routes" },
  { id: 8, label: "Intercepting routes" },
  { id: 9, label: "Caching model (4 layers)" },
  { id: 10, label: 'Cache Components ("use cache")' },
  { id: 11, label: "Streaming + Suspense" },
  { id: 12, label: "Partial Prerendering (PPR)" },
  { id: 13, label: "Middleware / proxy.ts" },
  { id: 14, label: "Async params / searchParams" },
  { id: 15, label: "Turbopack" },
] as const;

export function ProgressChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-200">
          Feature Checklist
        </h3>
        <span className="text-xs text-gray-400">
          {checked.size}/{FEATURES.length}
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${(checked.size / FEATURES.length) * 100}%`,
          }}
        />
      </div>
      {FEATURES.map((f) => (
        <label
          key={f.id}
          className="flex items-center gap-2 text-sm cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={checked.has(f.id)}
            onChange={() => toggle(f.id)}
            className="rounded border-gray-600 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
          />
          <span
            className={`${
              checked.has(f.id)
                ? "text-gray-500 line-through"
                : "text-gray-300 group-hover:text-white"
            } transition-colors`}
          >
            <span className="text-indigo-400 mr-1">#{f.id}</span>
            {f.label}
          </span>
        </label>
      ))}
    </div>
  );
}
