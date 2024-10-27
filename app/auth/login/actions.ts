"use server";

import { UserValidation } from "@/libs/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: UserValidation.email.errors.required,
      invalid_type_error: UserValidation.email.errors.type,
    })
    .trim()
    .email({ message: UserValidation.email.errors.pattern }),
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

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("valid data", result.data);
  }
}
