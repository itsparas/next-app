"use client";

import { useState, useTransition } from "react";
import { likePostAction } from "@/lib/actions";

type Props = {
  readonly postId: string;
  readonly initialLikes: number;
};

export function LikeButton({ postId, initialLikes }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  function handleLike() {
    // Optimistic update
    setLikes((prev) => prev + 1);
    startTransition(async () => {
      const serverCount = await likePostAction(postId);
      setLikes(serverCount);
    });
  }

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-600/20 text-pink-300 hover:bg-pink-600/30 transition-colors disabled:opacity-50 text-sm"
    >
      <span>{isPending ? "..." : "♥"}</span>
      <span>{likes}</span>
    </button>
  );
}
