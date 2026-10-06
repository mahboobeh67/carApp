import Image from "next/image";
import Link from "next/link";
import {
  FaWrench,
  FaShieldAlt,
  FaClock,
  FaFileMedical,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const trustFeatures = [
  { id: 1, title: "دیاگ تخصصی", desc: "خطایابی ECU", icon: FaWrench },
  { id: 2, title: "اصالت قطعات", desc: "لوازم اورجینال", icon: FaShieldAlt },
  { id: 3, title: "نوبت‌دهی سریع", desc: "بدون معطلی", icon: FaClock },
  { id: 4, title: "پرونده سلامت", desc: "سوابق دیجیتال", icon: FaFileMedical },
];

const servicesList = [
  "تعمیر موتور و گیربکس",
  "دیاگ و برق خودرو",
  "صافکاری PDR و نقاشی",
  "شست‌وشو و قطعه‌شویی",
  "سرویس دوره‌ای",
];

const quickLinks = [
  { name: "ثبت نوبت / پذیرش", href: "/dashboard/add" },
  { name: "پیگیری وضعیت خودرو", href: "/dashboard/my-receptions" },
  { name: "درباره کلینیک", href: "/about" },
  { name: "قوانین و ضمانت", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="mt-8 border-t-2 border-blue-400/40 bg-gradient-to-b from-[#304ffd] to-[#1e3a8a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {trustFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/20"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/20 text-white">
                  <Icon className="text-sm" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none text-white">{item.title}</h4>
                  <p className="text-[10px] text-blue-100 mt-1 leading-none">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 items-start">
          
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <FaGear className="animate-spin-slow text-xl text-blue-200" />
              <h3 className="text-base font-bold">کلینیک تخصصی خودرو</h3>
            </div>
            <p className="text-xs leading-5 text-blue-100/90 text-justify">
              ارائه‌دهنده خدمات تخصصی مهندسی خودرو، عیب‌یابی پیشرفته و تضمین سلامت فنی اتومبیل شما با تجهیزات روز دنیا.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="#" className="flex h-7 w-7 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/25" aria-label="Instagram">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="flex h-7 w-7 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/25" aria-label="Telegram">
                <FaTelegram className="text-sm" />
              </a>
              <a href="#" className="flex h-7 w-7 items-center justify-center rounded bg-white/10 text-white transition hover:bg-white/25" aria-label="WhatsApp">
                <FaWhatsapp className="text-sm" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white border-b border-white/20 pb-1.5 w-fit">
              خدمات تخصصی
            </h4>
            <ul className="mt-2.5 space-y-1.5 text-xs text-blue-100">
              {servicesList.map((service, index) => (
                <li key={index} className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                  <span className="h-1 w-1 rounded-full bg-blue-300"></span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white border-b border-white/20 pb-1.5 w-fit">
              دسترسی سریع
            </h4>
            <ul className="mt-2.5 space-y-1.5 text-xs text-blue-100">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-white transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-2 text-xs">
            <h4 className="font-bold text-white border-b border-white/20 pb-1.5 w-fit">
              ارتباط با کلینیک خودرو
            </h4>
            <div className="space-y-1.5 text-blue-100 pt-1">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-300 text-xs shrink-0" />
                <span dir="ltr" className="font-mono text-white text-xs">074-33335565</span>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-blue-300 text-xs shrink-0 mt-0.5" />
                <span className="leading-5">یاسوج، اکبرآباد، میدان آریوبرزن</span>
              </div>
            </div>
            <div className="pt-1">
             <div className="inline-flex h-22 w-22 items-center justify-center rounded-lg border border-white/30 bg-white/20 p-1 backdrop-blur-sm transition-transform hover:scale-105">
  <Image
    src="/images/logo.png"
    width={36}
    height={36}
    alt="نماد اعتماد الکترونیکی"
    className="object-contain"
    priority={false}
  />
</div>

            </div>
          </div>

        </div>
      </div>

      {/* ۳. نوار پایانی فوق‌العاده ظریف */}
      <div className="border-t border-white/10 bg-black/20 py-2.5 text-center">
        <p className="text-[11px] text-blue-200">
          © {new Date().getFullYear()} کلینیک تخصصی خودرو. تمامی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}


