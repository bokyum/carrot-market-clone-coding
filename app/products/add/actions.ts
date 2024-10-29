"use server";
import { redirect } from "next/navigation";

import fs from "fs/promises";
import db from "@/libs/db";
import getSession from "@/libs/session";
import { productSchema } from "./schema";

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(
      `./public/photos/${data.photo.name}`,
      Buffer.from(photoData)
    );

    data.photo = `/photos/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  if (session.id) {
    const product = await db.product.create({
      data: {
        title: result.data.title,
        price: result.data.price,
        description: result.data.description,
        photo: result.data.photo,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
      select: {
        id: true,
      },
    });
    return redirect(`/products/${product.id}`);
  } else {
    return redirect("/auth/login");
  }
}
