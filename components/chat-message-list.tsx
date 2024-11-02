"use client";

import { InitialMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/libs/utils";
import { ArrowUpCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

interface ChatMessageListProps {
  initialMessages: InitialMessages;
  userId: number;
}

export default function ChatMessageList({
  initialMessages,
  userId,
}: ChatMessageListProps) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [message, setMessage] = React.useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(message);
    setMessage("");
  };

  return (
    <div className="flex min-h-screen flex-col justify-end gap-5 p-5">
      {messages.map(message => (
        <div
          key={message.id}
          className={`flex items-start gap-2 ${
            message.user_id === userId ? "justify-end" : ""
          }`}
        >
          {message.user_id === userId ? null : (
            <div className="relative h-10 w-10">
              {" "}
              {message.user.avatar ? (
                <Image
                  src={message.user.avatar}
                  alt={message.user.username}
                  className="rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon className="size-10" />
              )}
            </div>
          )}
          <div
            className={`flex flex-col gap-1 ${
              message.user_id === userId ? "items-end" : ""
            }`}
          >
            <span
              className={`${
                message.user_id === userId ? "bg-neutral-500" : "bg-orange-500"
              } rounded-md p-2.5`}
            >
              {message.payload}
            </span>
            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
      <form className="relative flex" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="h-10 w-full rounded-full border-none bg-transparent px-5 ring-2 ring-neutral-200 transition placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-50"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </button>
      </form>
    </div>
  );
}
