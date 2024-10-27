"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
);

const checkUsername = (username: string) => {
  return /^[a-zA-Z0-9_]*$/.test(username);
};

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  return password === confirmPassword;
};

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "사용자 이름은 필수 입력 사항입니다.",
        invalid_type_error: "사용자 이름은 문자열이어야 합니다.",
      })
      .min(3, { message: "사용자 이름은 최소 3자 이상이어야 합니다." })
      .max(10, { message: "사용자 이름은 최대 10자 이하여야 합니다." })
      .toLowerCase()
      .trim()
      .refine(checkUsername, {
        message: "사용자 이름은 영문, 숫자, 밑줄(_)만 사용할 수 있습니다.",
      }),
    email: z
      .string({
        required_error: "이메일은 필수 입력 사항입니다.",
        invalid_type_error: "이메일은 문자열이어야 합니다.",
      })
      .trim()
      .email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string({
        required_error: "비밀번호는 필수 입력 사항입니다.",
        invalid_type_error: "비밀번호는 문자열이어야 합니다.",
      })
      .min(10, { message: "비밀번호는 최소 10자 이상이어야 합니다." })
      .trim()
      .regex(passwordRegex, {
        message: "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      }),

    confirmPassword: z
      .string({
        required_error: "비밀번호는 필수 입력 사항입니다.",
        invalid_type_error: "비밀번호는 문자열이어야 합니다.",
      })
      .min(10, { message: "비밀번호는 최소 10자 이상이어야 합니다." })
      .trim()
      .regex(passwordRegex, {
        message: "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      }),
  })
  .refine(checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export async function handleSubmit(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  // zod를 통한 validation

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log("valid data", result.data);
  }
}
/**
 {
  formErrors: [ '비밀번호가 일치하지 않습니다.' ],
  fieldErrors: {
    password: [ '비밀번호는 최소 10자 이상이어야 합니다.' ],
    confirmPassword: [ '비밀번호는 최소 10자 이상이어야 합니다.' ]
  }
}
 */
