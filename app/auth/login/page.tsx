"use client";
import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { handleSubmit } from "./actions";
import { useActionState } from "react";

export default function LogIn() {
  const [state, dispatch] = useActionState(handleSubmit, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required={true}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required={true}
        />

        <FormBtn text="Log In" />
      </form>

      <SocialLogin />
    </div>
  );
}
