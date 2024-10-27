"use server";

export async function handleSubmit(prevState: any, data: FormData) {
  console.log("prev state", prevState);
  console.log(data.get("email"), data.get("password"));
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("i run in the server");
  return {
    errors: ["Invalid password"],
  };
}
