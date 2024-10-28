"use server";
import { redirect } from "next/navigation";
import db from "@/libs/db";
import { UserValidation } from "./../../../libs/constants";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "../../../libs/session";

const checkUsername = (username: string) =>
  UserValidation.username.regex.test(username);

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

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
      })
      .refine(checkUniqueUsername, {
        message: UserValidation.username.errors.duplicate,
      }),
    email: z
      .string({
        required_error: UserValidation.email.errors.required,
        invalid_type_error: UserValidation.email.errors.type,
      })
      .trim()
      .email({ message: UserValidation.email.errors.pattern })
      .refine(checkUniqueEmail, {
        message: UserValidation.email.errors.duplicate,
      }),
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

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // save user to database
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);

    // log the user in

    const session = await getSession();
    session.id = user.id;
    await session.save();
    // redirect to /
    redirect("/profile");
  }
}
