"use client";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button
      className="px-6 my-2 rounded-sm p-3 shadow bg-[#334155] text-white capitalize"
      onClick={() => signIn("google")}
    >
      Login To INSTAGRAM
    </button>
  );
}

export default LoginButton;
