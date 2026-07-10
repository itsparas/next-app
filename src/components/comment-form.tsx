"use client";

import { useActionState } from "react";
import { addCommentAction, type ActionState } from "@/lib/actions";

type Props = {
  readonly postId: string;
};

const initialState: ActionState = { success: false };

export function CommentForm({ postId }: Props) {
  const [state, formAction, isPending] = useActionState(
    addCommentAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <textarea
        name="text"
        placeholder="Write a comment..."
        rows={3}
        className="w-full rounded-lg bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500"
      />

      {state.errors && (
        <div className="text-red-400 text-xs space-y-1">
          {state.errors.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      {state.success && (
        <p className="text-green-400 text-xs">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors disabled:opacity-50"
      >
        {isPending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
