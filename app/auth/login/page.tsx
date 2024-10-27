import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function LogIn() {
  const handleSubmit = async (data: FormData) => {
    "use server"; // 함수가 서버에서만 실행되도록 함
    console.log(data.get("email"), data.get("password"));
    console.log("i run in the server");
  };
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required={true}
          errors={[]}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required={true}
          errors={[]}
        />

        <FormBtn loading={false} text="Log In" />
      </form>
      <SocialLogin />
    </div>
  );
}
