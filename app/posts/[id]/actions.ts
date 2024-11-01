"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidateTag } from "next/cache";
export async function likePost(postId: number) {
  // await new Promise(r => setTimeout(r, 10000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        post_id: postId,
        user_id: session.id!,
      },
    });
    revalidateTag(`post-like-status-${postId}`);
  } catch (e) {}
}
export async function dislikePost(postId: number) {
  // await new Promise(r => setTimeout(r, 10000));
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          post_id: postId,
          user_id: session.id!,
        },
      },
    });
    revalidateTag(`post-like-status-${postId}`);
  } catch (e) {}
}
