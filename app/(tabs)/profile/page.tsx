import Btn from "@/components/btn";
import db from "@/libs/db";
import getSession, { clearSession } from "@/libs/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) return user;
  }
  return notFound();
}
export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";
    await clearSession();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <Btn text="Log Out" />
      </form>
    </div>
  );
}
