"use client";

import React, { Dispatch, SetStateAction } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// تعریف تایپ پایه با reservationDate که می‌تواند Date یا null باشد
interface WithReservationDate {
  reservationDate: Date | null;
}

interface CustomDatePickerProps<T extends WithReservationDate> {
  profileData: T;
  setProfileData: Dispatch<SetStateAction<T>>;
  label?: string;
  disablePastDates?: boolean; // آیا تاریخ‌های گذشته غیرفعال شوند؟ (پیش‌فرض: بله)
}

function CustomDatePicker<T extends WithReservationDate>({
  profileData,
  setProfileData,
  label = "تاریخ درخواست / رزرو نوبت",
  disablePastDates = true,
}: CustomDatePickerProps<T>): JSX.Element {
  
  const changeHandler = (dateObject: DateObject | null) => {
    if (!dateObject) {
      setProfileData((prev) => ({
        ...prev,
        reservationDate: null,
      }));
      return;
    }

    // تبدیل تاریخ انتخاب‌شده شمسی به شیء Date معتبر جاوااسکریپت (UTC/Local)
    const standardDate = dateObject.toDate();

    setProfileData((prev) => ({
      ...prev,
      reservationDate: standardDate,
    }));
  };

  return (
    <div className="flex w-full flex-col gap-2" dir="rtl">
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={profileData.reservationDate}
        onChange={changeHandler}
        calendarPosition="bottom-right"
        minDate={disablePastDates ? new Date() : undefined} // جلوگیری از انتخاب روزهای گذشته
        placeholder="تاریخ نوبت را انتخاب کنید..."
        format="YYYY/MM/DD"
        inputClass="
          w-full
          rounded-lg
          border border-gray-300
          bg-white
          px-4 py-2.5
          text-sm text-gray-700
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
        "
        containerClassName="w-full"
      />
    </div>
  );
}

export default CustomDatePicker;

