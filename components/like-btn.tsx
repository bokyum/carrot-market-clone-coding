"use client";
import { dislikePost, likePost } from "@/app/posts/[id]/actions";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { startTransition, useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  postId: number;
}
export default function LikeBtn({
  isLiked,
  likeCount,
  postId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    startTransition(() => {
      reducerFn(undefined);
      if (isLiked) {
        dislikePost(postId);
      } else {
        likePost(postId);
      }
    });
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border border-neutral-400 p-2 text-sm text-neutral-400 transition-colors ${
        state.isLiked
          ? "border-orange-500 bg-orange-500 text-white"
          : "hover:bg-neutral-800"
      }`}
    >
      <HandThumbUpIcon className="size-5" />

      <span> {state.likeCount}</span>
    </button>
  );
}
