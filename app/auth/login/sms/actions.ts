"use server";

import { redirect } from "next/navigation";
import validator from "validator";
import { z } from "zod";
const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format",
  );
const tokenSchema = z.coerce
  .number({ message: "숫자만 입력해주세요." })
  .min(100000, { message: "6자리 숫자를 입력해주세요." })
  .max(999999, { message: "6자리 숫자를 입력해주세요." });

interface ActionState {
  token: boolean;
}

export async function handleSmsLogin(
  prevStatus: ActionState,
  formData: FormData,
) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevStatus.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      return { token: true };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return { token: true, error: result.error.flatten() };
    } else {
      redirect("/");
    }
  }
}
