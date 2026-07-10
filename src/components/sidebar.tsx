"use client";

import { useState, type ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
  readonly title: string;
};

export function Sidebar({ children, title }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className="rounded-lg border border-gray-700 bg-gray-900/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between text-sm font-semibold text-gray-200 hover:bg-gray-800/50 transition-colors"
      >
        {title}
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </aside>
  );
}
