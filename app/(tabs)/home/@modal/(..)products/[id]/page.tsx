import { XMarkIcon } from "@heroicons/react/24/solid";
import BackBtn from "./BackBtn";
import { notFound } from "next/navigation";
import db from "@/libs/db";
import Image from "next/image";

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

export default async function Modal({ params }: { params: { id: string } }) {
  const id = parseInt((await params).id);
  if (isNaN(id)) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-60">
      <BackBtn className="absolute right-5 top-5 text-neutral-200">
        <XMarkIcon className="size-10" />
      </BackBtn>
      <div className="flex h-1/2 w-full max-w-screen-sm justify-center">
        <div className="flex aspect-square items-center justify-center rounded-md bg-neutral-700 text-neutral-200">
          <div className="relative size-[500px]">
            <Image
              fill
              src={`${product.photo}`}
              alt={product.title}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
