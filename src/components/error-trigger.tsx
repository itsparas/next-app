"use client";

import { useState } from "react";

export function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error(
      "This is a deliberately triggered error to demonstrate error.tsx!"
    );
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      className="px-4 py-2 rounded-lg bg-red-600/80 text-white text-sm font-medium hover:bg-red-500 transition-colors"
    >
      Trigger Error
    </button>
  );
}
