import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import BackBtn from "./BackBtn";
import { notFound } from "next/navigation";
import db from "@/libs/db";
import Image from "next/image";
import { formatToWon } from "@/libs/utils";
import Link from "next/link";
import getSession from "@/libs/session";

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
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
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function Modal({ params }: { params: { id: string } }) {
  const id = parseInt((await params).id);
  if (isNaN(id)) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  const isOwner = await getIsOwner(product.user_id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <BackBtn className="absolute right-5 top-5 text-neutral-200">
        <XMarkIcon className="h-10 w-10" /> {/* 클래스명 수정 */}
      </BackBtn>
      <div className="flex h-full w-full max-w-[500px] flex-col justify-between rounded-md bg-neutral-900">
        <div className="flex-grow overflow-y-auto">
          <div className="flex justify-center">
            <div className="flex aspect-square max-w-[500px] items-center justify-center rounded-md bg-neutral-700 text-neutral-200">
              <div className="relative h-[500px] w-[500px]">
                <Image
                  fill
                  src={`${product.photo}`}
                  alt={product.title}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 border-b border-neutral-600 p-5">
            {" "}
            {/* border 색상만 변경 */}
            <div className="h-10 w-10 overflow-hidden rounded-full">
              {" "}
              {/* 크기 명확히 지정 */}
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
            <p>{product.description}</p> {/* 스크롤이 필요한 긴 콘텐츠 */}
          </div>
        </div>
        <div className="sticky bottom-0 flex w-full items-center justify-between bg-neutral-800 p-5">
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
    </div>
  );
}
