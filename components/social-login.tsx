import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <>
      <div className="h-px w-full bg-neutral-500"></div>
      <div className="flex flex-col gap-3">
        <Link
          href="/auth/login/github"
          className="primary-btn flex h-10 items-center justify-center gap-3"
        >
          <span>
            <FaGithub className="h-6 w-6" />
          </span>
          <span>Continue with Github</span>
        </Link>
        <Link
          href="/auth/login/sms"
          className="primary-btn flex h-10 items-center justify-center gap-3"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
