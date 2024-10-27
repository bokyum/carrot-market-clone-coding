"use server";

export async function handleSubmit(prevState: any, formData: FormData) {
  console.log("prev state", prevState);
  console.log(formData.get("email"), formData.get("password"));
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("i run in the server");
  return {
    errors: ["Invalid password"],
  };
}
