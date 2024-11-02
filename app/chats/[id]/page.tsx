import ChatMessageList from "@/components/chat-message-list";
import db from "@/libs/db";
import getSession from "@/libs/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: { id: true },
      },
    },
  });
  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find(user => user.id === session.id!));
    if (!canSee) {
      return null;
    }
  }
  return room;
}

async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      room_id: chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      user_id: true,
      user: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  return messages;
}

// export type InitialProducts = Prisma.PromiseReturnType<
//   typeof getInitalProducts
// >;

export type InitialMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const { id } = await params;
  const room = await getRoom(id);
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessages(id);
  const session = await getSession();
  console.log(initialMessages);
  return (
    <ChatMessageList initialMessages={initialMessages} userId={session.id!} />
  );
}
