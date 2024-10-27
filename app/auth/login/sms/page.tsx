import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verity your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="number"
          name="phone"
          placeholder="Phone Number"
          required={true}
          errors={[]}
        />
        <FormInput
          type="number"
          name="verificationCode"
          placeholder="Verification code"
          required={true}
          errors={[]}
        />

        <FormBtn text="Verify" />
      </form>
    </div>
  );
}
