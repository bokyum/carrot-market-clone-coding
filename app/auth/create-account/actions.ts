"use server";
import { UserValidation } from "./../../../libs/constants";
import { z } from "zod";

const checkUsername = (username: string) =>
  UserValidation.username.regex.test(username);

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        required_error: UserValidation.username.errors.required,
        invalid_type_error: UserValidation.username.errors.type,
      })
      .min(UserValidation.username.minLength, {
        message: UserValidation.username.errors.min,
      })
      .max(UserValidation.username.maxLength, {
        message: UserValidation.username.errors.max,
      })
      .toLowerCase()
      .trim()
      .refine(checkUsername, {
        message: UserValidation.username.errors.pattern,
      }),
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

    confirmPassword: z
      .string({
        required_error: UserValidation.password.errors.required,
        invalid_type_error: UserValidation.password.errors.type,
      })
      .min(UserValidation.confirmPassword.minLength, {
        message: UserValidation.password.errors.min,
      })
      .trim()
      .regex(UserValidation.confirmPassword.regex, {
        message: UserValidation.password.errors.pattern,
      }),
  })
  .refine(checkPassword, {
    message: UserValidation.confirmPassword.errors.match,
    path: ["confirmPassword"],
  });

export async function handleSubmit(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log("valid data", result.data);
  }
}
