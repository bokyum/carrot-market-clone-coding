import db from "@/libs/db";
import getSession from "@/libs/session";
import { formatToTimeAgo } from "@/libs/utils";
import { EyeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import LikeBtn from "@/components/like-btn";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}
const getCachedPost = unstable_cache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});
async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        post_id: postId,
        user_id: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      post_id: postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id;
  if (!userId) {
    return notFound();
  }
  const cachedOperation = unstable_cache(getLikeStatus, [`post-like-status`], {
    tags: [`post-like-status-${postId}`],
    revalidate: 60,
  });
  return cachedOperation(postId, userId);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number((await params).id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const { likeCount, isLiked } = await getCachedLikeStatus(id);
  return (
    <div className="p-5 text-white">
      <div className="mb-2 flex items-center gap-2">
        {post.user.avatar ? (
          <Image
            width={28}
            height={28}
            className="size-7 rounded-full"
            src={post.user.avatar!}
            alt={post.user.username}
          />
        ) : (
          <UserCircleIcon className="size-7" />
        )}

        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col items-start gap-5">
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeBtn isLiked={isLiked} likeCount={likeCount} postId={id} />
      </div>
    </div>
  );
}
