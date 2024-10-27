"use client";
import Btn from "@/components/btn";
import Input from "@/components/input";

import { useActionState } from "react";
import { handleSmsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useActionState(handleSmsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verity your phone number.</h2>
      </div>
      <form
        id="sms-login-form"
        action={dispatch}
        className="flex flex-col gap-3"
      >
        <Input
          name="phone"
          type="text"
          placeholder="Phone number"
          required
          errors={state.error?.formErrors}
          disabled={state.token}
        />
        {state.token && (
          <Input
            name="token"
            type="number"
            placeholder="Verification code"
            required
            min={100000}
            max={999999}
          />
        )}
        <Btn
          type={"submit"}
          text={state.token ? "Verify Code" : "Send Verification SMS"}
        />
      </form>
    </div>
  );
}
