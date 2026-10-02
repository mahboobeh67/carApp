"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import ReceptionCard, { IReceptionCard } from "./ReceptionCard";

interface DashboardCardProps {
  data: IReceptionCard;
}

function DashboardCard({ data }: DashboardCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // هدایت به صفحه ویرایش اطلاعات خودرو و نوبت
  const editHandler = () => {
    router.push(`/dashboard/my-receptions/edit/${data._id}`);
  };

  // حذف یا ابطال پرونده نوبت
  const deleteHandler = async () => {
    const isConfirmed = window.confirm(
      `آیا از حذف پرونده خودروی «${data.carModel}» به شماره پلاک «${data.plateNumber}» اطمینان دارید؟`
    );

    if (!isConfirmed) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/receptions/${data._id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "خطا در حذف پرونده نوبت");
      }

      toast.success("پرونده نوبت با موفقیت حذف شد");
      // تازه‌سازی لیست نوبت‌ها در سرور کامپوننت
      router.refresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "مشکلی در حذف رخ داد";
      toast.error(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="mb-4 flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:shadow-md md:flex-row md:items-stretch"
    >
      {/* کارت نمایش اطلاعات خودرو و نوبت */}
      <div className="w-full md:w-auto">
        <ReceptionCard data={data} />
      </div>

      {/* پنل عملیات و دکمه‌های کنترلی */}
      <div className="flex w-full flex-1 flex-col justify-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <div className="mb-1 hidden text-xs font-semibold text-slate-500 md:block">
          عملیات پرونده:
        </div>

        {/* دکمه ویرایش پرونده */}
        <button
          onClick={editHandler}
          type="button"
          disabled={isDeleting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300/70 bg-emerald-50 py-2.5 px-4 text-sm font-semibold text-emerald-800 transition-all duration-200 hover:bg-emerald-100 active:scale-[0.99] disabled:opacity-50"
        >
          <span>ویرایش مشخصات و نوبت</span>
          <FiEdit3 className="text-base text-emerald-700" />
        </button>

        {/* دکمه حذف و لغو نوبت */}
        <button
          onClick={deleteHandler}
          type="button"
          disabled={isDeleting}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-300/70 bg-rose-50 py-2.5 px-4 text-sm font-semibold text-rose-800 transition-all duration-200 hover:bg-rose-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <span className="flex items-center gap-2 text-xs">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-rose-700 border-t-transparent" />
              در حال حذف نوبت...
            </span>
          ) : (
            <>
              <span>لغو و حذف پرونده</span>
              <AiOutlineDelete className="text-lg text-rose-700" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;

