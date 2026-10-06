"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const navLinks = [
  { href: "/", label: "صفحه نخست" },
  { href: "/services", label: "خدمات" },
  { href: "/about-us", label: "درباره ما" },
  { href: "/contact-us", label: "ارتباط با ما" },
];

function Header() {
  const { data } = useSession();

  return (
    <header className="sticky top-4 z-50 my-4 flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-[#304ffe] via-[#2541df] to-[#1e3bbd] px-4 sm:px-6 py-3 text-white shadow-lg shadow-blue-600/20 backdrop-blur-md">
      <div className="flex items-center gap-4 md:gap-7">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 transition-all group-hover:bg-white/25">
            <FaGear className="text-lg text-white group-hover:rotate-90 transition-transform duration-500" />
          </div>
          <span className="text-sm sm:text-base font-extrabold tracking-tight text-white drop-shadow-sm whitespace-nowrap">
            کلینیک تخصصی خودرو
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-blue-100 transition-all hover:bg-white/15 hover:text-white whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shrink-0 mr-2">
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
      </div>
    </header>
  );
}

export default Header;
