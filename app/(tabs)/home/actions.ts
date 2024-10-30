"use server";
import db from "@/libs/db";

export async function getMoreProduct(page: number) {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
    },
    skip: page * 10,
    take: 10,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}
