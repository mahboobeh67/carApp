
import Link from "next/link";
import Image from "next/image";
import { FaCarSide, FaGasPump, FaCalendarAlt, FaTools } from "react-icons/fa";
import { BiLeftArrowAlt } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";

export interface IReceptionCard {
  _id: string;
  ownerName: string;
  carModel: string;
  plateNumber: string;
  fuelType?: "بنزینی" | "دوگانه‌سوز" | "دیزلی" | "هیبریدی";
  services?: string[];
  reservationDate?: string | Date;
  status?: "pending" | "in_progress" | "completed" | "canceled";
  images?: string[];
}

interface CardProps {
  data: IReceptionCard;
}

// وضعیت‌های مختلف نوبت با رنگ و برچسب‌های خوانا
const statusMap: Record<
  string,
  { label: string; badgeClass: string }
> = {
  pending: {
    label: "در انتظار پذیرش",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
  in_progress: {
    label: "در حال تعمیر",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  completed: {
    label: "تعمیر شد / تحویل",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  canceled: {
    label: "لغو شده",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

function ReceptionCard({ data }: CardProps) {
  const {
    _id,
    ownerName,
    carModel,
    plateNumber,
    fuelType = "بنزینی",
    services = [],
    reservationDate,
    status = "pending",
    images = [],
  } = data;

  const currentStatus = statusMap[status] || statusMap.pending;

  // فرمت تاریخ به شمسی با Intl
  const formattedDate = reservationDate
    ? new Date(reservationDate).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "تعیین نشده";

  return (
    <div
      dir="rtl"
      className="group flex w-full max-w-[320px] min-w-[260px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
    >
      <div>
        {/* تصویر شاخص خودرو یا آیکون پیش‌فرض */}
        <div className="relative mb-3.5 h-36 w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
          {images && images.length > 0 ? (
            <Image
              src={images[0]}
              alt={carModel}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-slate-400">
              <FaCarSide className="text-4xl text-slate-300" />
              <span className="text-[11px] font-medium">بدون تصویر خودرو</span>
            </div>
          )}

          {/* بج وضعیت نوبت در گوشه کارت */}
          <span
            className={`absolute top-2.5 right-2.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm ${currentStatus.badgeClass}`}
          >
            {currentStatus.label}
          </span>
        </div>

        {/* مدل ماشین و نام مالک */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <h3
              className="truncate text-base font-bold text-slate-800"
              title={carModel}
            >
              {carModel}
            </h3>
            {/* نوع سوخت */}
            <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
              <FaGasPump className="text-slate-400 text-xs" />
              {fuelType}
            </span>
          </div>

          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <HiOutlineUser className="text-sm text-slate-400 shrink-0" />
            <span>مالک: {ownerName || "ثبت نشده"}</span>
          </p>
        </div>

        {/* پلاک خودرو (طراحی شبه پلاک ملی) */}
        <div className="my-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-1.5 font-mono text-xs font-bold text-slate-700">
          <span className="text-[11px] font-medium text-slate-400 font-sans">شماره پلاک:</span>
          <span className="tracking-wider text-slate-900">{plateNumber || "---"}</span>
        </div>

        {/* تاریخ رزرو و سرویس‌ها */}
        <div className="space-y-1.5 border-t border-slate-100 pt-2.5 text-xs text-slate-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-400 text-[11px]">
              <FaCalendarAlt className="text-slate-400" />
              تاریخ نوبت:
            </span>
            <span className="font-semibold text-slate-700">{formattedDate}</span>
          </div>

          {services.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-400 text-[11px]">
                <FaTools className="text-slate-400" />
                تعداد خدمات:
              </span>
              <span className="font-semibold text-blue-600">
                {services.length} مورد
              </span>
            </div>
          )}
        </div>
      </div>

      {/* دکمه ورود به جزئیات پرونده */}
      <Link
        href={`/dashboard/receptions/${_id}`}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/60 py-2.5 px-3 text-xs font-bold text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white group/btn"
      >
        <span>مشاهده جزئیات پرونده</span>
        <BiLeftArrowAlt className="text-base transition-transform duration-200 group-hover/btn:-translate-x-1" />
      </Link>
    </div>
  );
}

export default ReceptionCard;
