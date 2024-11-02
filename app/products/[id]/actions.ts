"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { redirect } from "next/navigation";

export const createChateRoom = async (sellerId: number) => {
  const session = await getSession();
  const buyerId = session.id;
  console.log(sellerId, buyerId);
  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [{ id: sellerId }, { id: buyerId }],
      },
    },
    select: {
      id: true,
    },
  });
  redirect(`/chats/${room.id}`);
};
