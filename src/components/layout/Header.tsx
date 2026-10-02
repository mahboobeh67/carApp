"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

function Header() {
  const { data } = useSession();

  return (
    <header className="flex justify-between items-center p-[20px] my-[20px] rounded-[10px] bg-[#304ffe] text-white">
      <div>
        <ul className="flex list-none gap-x-[10px] sm:gap-x-[30px]">
          <li>
            <Link href="/" className="hover:text-gray-200 transition-colors">
              صفحه نخست
            </Link>
          </li>
          <li>
            <Link
              href="/buy-residential"
              className="hover:text-gray-200 transition-colors"
            >
              خدمات
            </Link>
          </li>
        </ul>
      </div>

      {data ? (
        <div>
          <Link
            href="/dashboard"
            className="flex items-center bg-white text-[#304ffe] px-[7px] py-[3px] rounded-[5px] transition-all ease-in duration-100 hover:bg-[#304ffe] hover:text-white border border-transparent hover:border-white"
          >
            <FaUserAlt className="text-[25px]" />
          </Link>
        </div>
      ) : (
        <div>
          <Link
            href="/signin"
            className="flex items-center bg-white text-[#304ffe] px-[7px] py-[3px] rounded-[5px] transition-all ease-in duration-100 hover:bg-[#304ffe] hover:text-white border border-transparent hover:border-white"
          >
            <FiLogIn className="text-[25px]" />
            <span className="mr-[5px]">ورود</span>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
