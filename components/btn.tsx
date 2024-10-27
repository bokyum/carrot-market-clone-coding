"use client";

import { useFormStatus } from "react-dom";

interface BtnProps {
  text: string;
}
export default function Btn({
  text,
  ...rest
}: BtnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-300"
      {...rest}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
