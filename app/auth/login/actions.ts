"use server";

import { UserValidation } from "@/libs/constants";
import db from "@/libs/db";
import { z } from "zod";
import bycrypt from "bcrypt";
import getSession from "@/libs/session";
import { redirect } from "next/navigation";

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({
      required_error: UserValidation.email.errors.required,
      invalid_type_error: UserValidation.email.errors.type,
    })
    .trim()
    .email({ message: UserValidation.email.errors.pattern })
    .refine(checkEmailExist, "회원가입된 이메일이 아닙니다."),
  password: z
    .string({
      required_error: UserValidation.password.errors.required,
      invalid_type_error: UserValidation.password.errors.type,
    })
    .min(UserValidation.password.minLength, {
      message: UserValidation.password.errors.min,
    })
    .trim()
    .regex(UserValidation.password.regex, {
      message: UserValidation.password.errors.pattern,
    }),
});
export async function handleSubmit(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // if user is founded, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bycrypt.compare(
      result.data.password,
      user!.password || "XXXX",
    );
    if (ok) {
      const session = await getSession();
      session.id = user?.id;
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 틀렸습니다."],
          email: [],
        },
      };
    }
  }
}
