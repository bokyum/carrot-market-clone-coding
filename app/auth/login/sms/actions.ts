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
const verificationCodeSchema = z.coerce
  .number({ message: "숫자만 입력해주세요." })
  .min(100000, { message: "6자리 숫자를 입력해주세요." })
  .max(999999, { message: "6자리 숫자를 입력해주세요." });

interface ActionState {
  isSendVerificationCode: boolean;
}

export async function handleSmsLogin(
  prevStatus: ActionState,
  formData: FormData,
) {
  const phone = formData.get("phone");
  const verificationCode = formData.get("verificationCode");

  if (!prevStatus.isSendVerificationCode) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return { isSendVerificationCode: false, error: result.error.flatten() };
    } else {
      return { isSendVerificationCode: true };
    }
  } else {
    const result = verificationCodeSchema.safeParse(verificationCode);
    if (!result.success) {
      return { isSendVerificationCode: true, error: result.error.flatten() };
    } else {
      redirect("/");
    }
  }
}
