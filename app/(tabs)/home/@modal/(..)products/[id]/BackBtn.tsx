"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BackBtn({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const router = useRouter();
  return (
    <button {...rest} onClick={() => router.back()}>
      {children}
    </button>
  );
}
