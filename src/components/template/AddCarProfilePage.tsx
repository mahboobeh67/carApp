"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { InputField } from "../InputField";
import { SelectField } from "../SelectField";
import { TextareaField } from "../TextareaField";
import { ServiceCheckboxGroup } from "../ServiceCheckboxGroup";
import CustomDatePicker from "../CustomDatePiker";
import AddPhotoPage from "../AddPhotoPage";

export type CarProfileFormData = {
  ownerName: string;
  carModel: string;
  plateNumber: string;
  phone: string;
  description: string;
  productionYear: string;
  fuelType: "gasoline" | "petrol" | "hybrid" | "cng" | "diesel" | "dual" | "";
  services: string[];
  images: string[];
  reservationDate: Date | null;
};

const AVAILABLE_SERVICES = [
  "تعویض روغن و فیلترها",
  "عیب‌یابی موتور (دیاگ)",
  "سرویس گیربکس",
  "سیستم تعلیق و جلوبندی",
  "ترمز و لنت",
  "برق خودرو و باتری",
];

const FUEL_OPTIONS = [
  { label: "بنزینی", value: "gasoline" },
  { label: "هیبریدی", value: "hybrid" },
  { label: "دوگانه‌سوز CNG", value: "cng" },
  { label: "دیزلی", value: "diesel" },
];

export default function AddCarProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<CarProfileFormData>({
    ownerName: "",
    carModel: "",
    plateNumber: "",
    phone: "",
    description: "",
    productionYear: "",
    fuelType: "",
    services: [],
    images: [],
    reservationDate: new Date(),
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.services.includes(service);
      const updatedServices = alreadySelected
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service];
      return { ...prev, services: updatedServices };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.fuelType) {
      toast.error("لطفاً نوع سوخت خودرو را مشخص کنید");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/receptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "خطا در ثبت نوبت خودرو");
      }

      toast.success("پرونده پذیرش خودرو با موفقیت ثبت شد 🎉");
      router.push("/dashboard/my-receptions");
      router.refresh();
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "مشکلی در ذخیره اطلاعات پیش آمد";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 text-right"
      dir="rtl"
    >
      <div className="w-full max-w-3xl rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-xl">
        <div className="mb-8 text-center">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
            سیستم پذیرش هوشمند
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-gray-800 sm:text-3xl">
            پذیرش در کلینیک خودرو
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            ثبت مشخصات فنی و نوبت‌دهی تعمیرات
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="نام و نام‌خانوادگی مالک"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              placeholder="مثلاً: مریم نادری"
              required
            />

            <InputField
              label="شماره تماس"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="09123456789"
              dir="ltr"
              required
            />

            <InputField
              label="مدل و نوع خودرو"
              name="carModel"
              value={formData.carModel}
              onChange={handleInputChange}
              placeholder="مثلاً: پژو 207 اتوماتیک"
              required
            />

            <InputField
              label="سال تولید"
              name="productionYear"
              value={formData.productionYear}
              onChange={handleInputChange}
              placeholder="مثلاً: 1401"
            />

            <InputField
              label="شماره پلاک"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleInputChange}
              placeholder="ایران 77 - 123 ب 45"
              dir="ltr"
              required
            />

            <SelectField
              label="نوع سوخت"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              options={FUEL_OPTIONS}
              required
            />
          </div>

          <TextareaField
            label="شرح مشکلات خودرو"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="مثلاً: هنگام ترمز گرفتن فرمان می‌لرزد و صبح‌ها دیر روشن می‌شود..."
            required
          />

          <ServiceCheckboxGroup
            label="سرویس‌های درخواستی"
            services={AVAILABLE_SERVICES}
            selectedServices={formData.services}
            onToggleService={handleServiceChange}
          />

          {/* کامپوننت آپلود تصویر */}
          <AddPhotoPage
            profileData={formData}
            setProfileData={setFormData}
            maxPhotos={6}
          />

          {/* تقویم انتخاب نوبت */}
          <CustomDatePicker
            profileData={formData}
            setProfileData={setFormData}
            label="تاریخ درخواست پذیرش خودرو"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                در حال ثبت پرونده خودرو...
              </span>
            ) : (
              "ثبت پرونده و نوبت پذیرش خودرو"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
