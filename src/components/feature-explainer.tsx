"use client";

import { useState } from "react";

type Props = {
  readonly featureId: number;
  readonly title: string;
  readonly what: string;
  readonly whyHere: string;
  readonly code: string;
  readonly pagesRouterEquivalent?: string;
};

export function FeatureExplainer({
  featureId,
  title,
  what,
  whyHere,
  code,
  pagesRouterEquivalent,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="my-6 rounded-lg border-2 border-indigo-400/40 bg-indigo-950/30 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-indigo-950/50 transition-colors"
      >
        <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-indigo-500 text-white text-xs font-bold">
          {featureId}
        </span>
        <span className="font-semibold text-indigo-200 text-sm">
          Feature Explainer: {title}
        </span>
        <span className="ml-auto text-indigo-400 text-xs">
          {isOpen ? "collapse" : "expand"}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3 text-sm">
          <div>
            <h4 className="font-semibold text-indigo-300 mb-1">What</h4>
            <p className="text-gray-300">{what}</p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-300 mb-1">Why here</h4>
            <p className="text-gray-300">{whyHere}</p>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs px-3 py-1.5 rounded bg-indigo-800/60 text-indigo-200 hover:bg-indigo-700/60 transition-colors"
          >
            {showCode ? "Hide code" : "Show the code"}
          </button>

          {showCode && (
            <pre className="p-3 rounded bg-gray-900 text-gray-300 text-xs overflow-x-auto whitespace-pre-wrap">
              {code}
            </pre>
          )}

          {pagesRouterEquivalent && (
            <div className="pt-2 border-t border-indigo-800/50">
              <h4 className="font-semibold text-indigo-300 mb-1 text-xs">
                Pages Router equivalent
              </h4>
              <p className="text-gray-400 text-xs">{pagesRouterEquivalent}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
