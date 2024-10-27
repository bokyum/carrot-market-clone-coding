import Link from "next/link";
import "@/libs/db";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="my-auto flex flex-col items-center *:font-medium">
        <span className="text-6xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex w-full flex-col items-center gap-3">
        <Link
          href="/auth/create-account"
          className="primary-btn py-2.5 text-lg"
        >
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있으신가요?</span>
          <Link href="/auth/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
