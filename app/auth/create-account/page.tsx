"use client";
import Btn from "@/components/btn";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";

import { useActionState } from "react";
import { handleSubmit } from "./actions";
import { UserValidation } from "@/libs/constants";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(handleSubmit, null);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          type="text"
          name="username"
          placeholder="Username"
          required={true}
          errors={state?.fieldErrors.username}
          minLength={UserValidation.username.minLength}
          maxLength={UserValidation.username.maxLength}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          errors={state?.fieldErrors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          errors={state?.fieldErrors.password}
          minLength={UserValidation.password.minLength}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required={true}
          errors={state?.fieldErrors.confirmPassword}
          minLength={UserValidation.confirmPassword.minLength}
        />

        <Btn text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
