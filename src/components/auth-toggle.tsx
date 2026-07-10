"use client";

import { loginAction, logoutAction } from "@/lib/actions";

type Props = {
  readonly isLoggedIn: boolean;
  readonly username?: string;
};

export function AuthToggle({ isLoggedIn, username }: Props) {
  return (
    <form
      action={isLoggedIn ? logoutAction : loginAction}
      className="ml-2"
    >
      <button
        type="submit"
        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
          isLoggedIn
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
            : "bg-indigo-600 text-white hover:bg-indigo-500"
        }`}
      >
        {isLoggedIn ? `${username} (logout)` : "Login as Demo User"}
      </button>
    </form>
  );
}
