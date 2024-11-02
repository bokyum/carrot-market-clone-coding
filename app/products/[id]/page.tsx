import db from "@/libs/db";
import getSession from "@/libs/session";
import { formatToWon } from "@/libs/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = parseInt((await params).id);

  const product = await getProduct(id);

  return {
    title: `${product?.title && product?.title}`,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  const isOwner = await getIsOwner(product.user_id);

  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="flex items-center gap-3 border-b border-neutral-700 p-5">
        <div className="size-10 overflow-hidden rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="pb-32">{product.description}</p>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-between bg-neutral-800 p-5 pb-10">
        <span className="text-xl font-semibold">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <button className="rounded-md bg-red-500 px-5 py-2.5 font-semibold text-white">
            Delete product
          </button>
        ) : (
          <Link
            className="rounded-md bg-orange-500 px-5 py-2.5 font-semibold text-white"
            href={``}
          >
            채팅하기
          </Link>
        )}
      </div>
    </div>
  );
}
