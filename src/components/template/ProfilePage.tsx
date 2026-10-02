"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  FiPhone,
  FiMail,
  FiEdit2,
  FiCalendar,
  FiX,
  FiCheck,
} from "react-icons/fi";

export interface UserData {
  email: string;
  phone: string;
  createdAt: Date | string | null;
}

interface ProfilePageProps {
  data: UserData;
}

function ProfilePage({ data }: ProfilePageProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserData>({
    email: data?.email || "",
    phone: data?.phone || "",
    createdAt: data?.createdAt || null,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, phone: formData.phone }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "خطا در به‌روزرسانی");

      toast.success(result.message || "اطلاعات با موفقیت به‌روزرسانی شد");
      setIsEditing(false);
      router.refresh();
    } catch (err: unknown) {
  const errorMsg = err instanceof Error ? err.message : "مشکلی در ذخیره اطلاعات پیش آمد";
  toast.error(errorMsg);
} finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    setIsEditing(false);
    setFormData({
      email: data?.email || "",
      phone: data?.phone || "",
      createdAt: data?.createdAt || null,
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 p-4" dir="rtl">
      {/* هدر پروفایل */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-md shadow-blue-500/20">
            {formData.email ? formData.email.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">حساب کاربری</h1>
            <p className="text-xs text-slate-500">مدیریت اطلاعات و هویت مالک</p>
          </div>
        </div>
      </div>

      {/* کارت نمایش و ویرایش اطلاعات */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {/* فیلد ایمیل */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-all">
            <div className="flex flex-1 items-center gap-3">
              <FiMail className="shrink-0 text-lg text-blue-600" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  dir="ltr"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <span className="text-sm font-medium text-slate-700" dir="ltr">
                  {formData.email || "---"}
                </span>
              )}
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                title="ویرایش اطلاعات"
              >
                <FiEdit2 className="text-base" />
              </button>
            )}
          </div>

          {/* فیلد شماره تماس */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition-all">
            <div className="flex flex-1 items-center gap-3">
              <FiPhone className="shrink-0 text-lg text-emerald-600" />
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                  dir="ltr"
                  maxLength={11}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              ) : (
                <span className="text-sm font-medium text-slate-700" dir="ltr">
                  {formData.phone || "---"}
                </span>
              )}
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                title="ویرایش اطلاعات"
              >
                <FiEdit2 className="text-base" />
              </button>
            )}
          </div>

          {/* تاریخ عضویت */}
          {formData.createdAt && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
              <FiCalendar className="shrink-0 text-lg text-amber-600" />
              <span className="text-sm text-slate-600">
                تاریخ عضویت:{" "}
                <span className="font-semibold text-slate-800">
                  {new Date(formData.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* دکمه‌های تایید یا لغو در حالت ویرایش */}
        {isEditing && (
          <div className="mt-6 flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={submitHandler}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <FiCheck className="text-base" />
              )}
              <span>ذخیره تغییرات</span>
            </button>
            <button
              type="button"
              onClick={cancelHandler}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 active:scale-[0.99]"
            >
              <FiX className="text-base" />
              <span>انصراف</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
