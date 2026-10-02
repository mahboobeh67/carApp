"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  return (
    <button
      type="button"
      className="mt-[20px] flex items-center gap-2 text-center font-normal text-red-700 cursor-pointer bg-transparent"
     onClick={() => signOut({ callbackUrl: "/signin" })}>
      <FiLogOut className="text-[1.2rem] text-red-700" />
      <span>خروج</span>
    </button>
  );
}

export default LogoutButton;
