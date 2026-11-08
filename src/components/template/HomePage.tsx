import CategoryCard from "@/module/CategoryCard";
import { FiCircle, FiMapPin, FiTool } from "react-icons/fi";

function HomePage() {
  const services = [
    "تعمیر موتور و گیربکس",
    "دیاگ و برق خودرو",
    "صافکاری PDR و نقاشی",
    "شست‌وشو و قطعه‌شویی",
    "سرویس دوره‌ای",
  ];

  const cities = [
    "تهران",
    "شیراز",
    "یاسوج",
    "کرمانشاه",
    "بوشهر",
    "تبریز",
    "ارومیه",
    "اصفهان",
    "شهرکرد",
  ];
   const carCategories = [
    { title: "موتور و گیربکس", name: "engine" },
    { title: "دیاگ و برق", name: "diagnostic" },
    { title: "صافکاری و نقاشی", name: "bodywork" },
    { title: "شست‌وشو و دیتیلینگ", name: "detailing" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <div className="text-center space-y-4">
          
          <h1 className="inline-flex items-center gap-2 px-4 py-1.5  rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-sm font-medium shadow-sm">
            سامانه رزرو نوبت تعمیرگاهی خودرو
          </h1>
          
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            خدمات تخصصی تعمیرگاه
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
                  <FiCircle className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium text-slate-700 group-hover:text-blue-700 transition-colors text-sm sm:text-base">
                  {service}
                </span>
              </div>
            ))}
          </div>
        </div>
 <div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
            <FiTool className="text-blue-600" />
            <span>بخش‌های تخصصی تعمیرگاه</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {carCategories.map((cat) => (
              <CategoryCard key={cat.name} title={cat.title} name={cat.name} />
            ))}
          </div>
        </div>
      </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
            <FiMapPin className="text-emerald-600" />
            <span>شعبه‌های فعال در سراسر کشور</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2.5">
            {cities.map((city, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium hover:bg-emerald-600 hover:border-emerald-500 hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
              >
                {city}
              </span>
            ))}
          </div>
          
        </div>

      </div>
     
    </div>
  );
}

export default HomePage;


