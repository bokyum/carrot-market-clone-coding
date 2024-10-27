"use client";
import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

import { useActionState } from "react";
import { handleSubmit } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(handleSubmit, null);
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          required={true}
          errors={state?.fieldErrors.username}
        />
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          errors={state?.fieldErrors.email}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          errors={state?.fieldErrors.password}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required={true}
          errors={state?.fieldErrors.confirmPassword}
        />

        <FormBtn text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
