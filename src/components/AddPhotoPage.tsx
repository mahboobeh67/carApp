"use client";

import React, { useState, ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface AddPhotoProps<T extends { images: string[] }> {
  profileData: T;
  setProfileData: Dispatch<SetStateAction<T>>;
  maxPhotos?: number;
}

function AddPhotoPage<T extends { images: string[] }>({
  profileData,
  setProfileData,
  maxPhotos = 6,
}: AddPhotoProps<T>) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // اطمینان از اینکه همیشه یک آرایه معتبر در اختیار داریم
  const currentImages = profileData?.images || [];

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (currentImages.length + files.length > maxPhotos) {
      toast.error(`حداکثر می‌توانید ${maxPhotos} تصویر بارگذاری کنید.`);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 4 * 1024 * 1024) {
        toast.error(`حجم فایل ${file.name} بیشتر از ۴ مگابایت است.`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(`فایل ${file.name} یک تصویر معتبر نیست.`);
        return;
      }

      formData.append("files", file);
    }

    try {
      setIsUploading(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data =await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در آپلود تصاویر");
      }

      const uploadedUrls: string[] = data.urls || (data.url ? [data.url] : []);

      setProfileData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls],
      }));

      toast.success("تصاویر با موفقیت بارگذاری شدند");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "مشکلی در آپلود تصاویر پیش آمد";
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setProfileData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, index) => index !== indexToRemove),
    }));
    toast.success("تصویر حذف شد");
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm" dir="rtl">
      {/* هدر بخش تصاویر */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-800">
            تصاویر وضعیت خودرو
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            عکس‌های بدنه، آسیب‌دیدگی‌ها یا قطعات نیازمند تعمیر را اضافه کنید.
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {currentImages.length} از {maxPhotos} تصویر
        </span>
      </div>

      {/* اینپوت مخفی فایل */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {/* بخش افزودن عکس و دکمه انتخاب */}
      {currentImages.length < maxPhotos && (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 p-6 transition-all hover:border-blue-500 hover:bg-blue-50/80 ${
            isUploading ? "cursor-not-allowed opacity-60" : ""
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
              <span className="text-sm font-medium text-blue-700">در حال آپلود تصاویر...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>

              <div>
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-blue-700"
                >
                  انتخاب و بارگذاری تصویر
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  فرمت‌های مجاز: JPG, PNG, WEBP (حداکثر ۴ مگابایت)
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* پیش‌نمایش عکس‌های انتخاب‌شده به همراه دکمه حذف ضربدر قرمز */}
      {currentImages.length > 0 && (
        <div className="mt-2">
          <p className="mb-2 text-xs font-semibold text-gray-600">تصاویر آپلود شده (برای حذف روی ✕ کلیک کنید):</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {currentImages.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative aspect-video w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-gray-50 shadow-sm"
              >
                <Image
                  src={url}
                  alt={`تصویر خودرو ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* دکمه حذف قرمز رنگ روی هر عکس */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemovePhoto(index);
                  }}
                  title="حذف این تصویر"
                  className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white shadow hover:bg-red-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddPhotoPage;
