"use client";

import { useActionState } from "react";
import { createPostAction, type ActionState } from "@/lib/actions";

const initialState: ActionState = { success: false };

export function NewPostForm() {
  const [state, formAction, isPending] = useActionState(
    createPostAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Title
        </label>
        <input
          name="title"
          type="text"
          required
          className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Slug
        </label>
        <input
          name="slug"
          type="text"
          required
          placeholder="my-post-slug"
          className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Excerpt
        </label>
        <input
          name="excerpt"
          type="text"
          required
          className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Content
        </label>
        <textarea
          name="content"
          required
          rows={5}
          className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {state.errors && (
        <div className="text-red-400 text-xs space-y-1">
          {state.errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      {state.success && (
        <p className="text-green-400 text-sm font-medium">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
