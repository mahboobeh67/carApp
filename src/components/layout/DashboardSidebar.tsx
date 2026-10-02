import React from "react";
import { CgProfile } from "react-icons/cg";
import { getServerSession } from "next-auth";
import { authOption } from "@/utils/authOptions";
import Link from "next/link";
import LogoutButton from "@/module/LogoutButton";

type DashboardSidebarProps = {
  children: React.ReactNode;
};

async function DashboardSidebar({ children }: DashboardSidebarProps) {
  const session = await getServerSession(authOption);

  return (
    <div className=" flex w-full justify-between gap-10">
      <aside className="h-fit w-[250px] mt-5  rounded-[10px] bg-white px-[15px] py-[30px] shadow-[0_4px_15px_rgba(48,79,254,0.29)]">
        <div className="mb-5 flex w-full flex-col items-start">
          {/* ردیف اول: آیکون و لینک کنار هم */}
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center text-[2.2rem] text-[#304ffe]">
              <CgProfile />
            </span>
            <Link
              href="/dashboard"
              className="text-[1.05rem] font-medium text-gray-700 hover:text-[#304ffe] transition-colors"
            >
              پنل کاربری
            </Link>
          </div>

          {/* ایمیل: زیر ردیف بالا قرار می‌گیرد */}
          <p className="mt-1 text-sm text-gray-500">
            {session?.user?.email ?? "کاربر"}
          </p>
        </div>

        <span className="mb-[30px] block h-px w-full bg-gray-300" />

        <nav className="flex w-full flex-col">
          <Link
            href="/dashboard"
            className="my-[5px] w-full font-normal text-gray-700 transition-colors hover:text-[#304ffe]"
          >
            داشبورد
          </Link>
          <Link
            href="/dashboard/profile"
            className="my-[5px] w-full font-normal text-gray-700 transition-colors hover:text-[#304ffe]"
          >
               پروفایل
          </Link>
          <Link
            href="/dashboard/my-receptions"
            className="my-[5px] w-full font-normal text-gray-700 transition-colors hover:text-[#304ffe]"
          >
            خدمات دریافتی من
          </Link>
          <Link
            href="/dashboard/add"
            className="my-[5px] w-full font-normal text-gray-700 transition-colors hover:text-[#304ffe]"
          >
            رزرو نوبت
          </Link>
          <LogoutButton />
        </nav>
      </aside>

      <main className="w-full">{children}</main>
    </div>
  );
}

export default DashboardSidebar;
