function Footer() {
  return (
    <footer className="flex justify-between p-[25px] mt-[80px] mb-[20px] bg-[#304ffd] text-white rounded-t-lg border-t-4 border-blue-700">
      <div className="ml-0 md:ml-[30px] text-justify w-full md:w-[70%]">
        <h3 className="mb-[15px] text-[1.4rem] font-bold text-withe">
          کلینیک تخصصی خودرو «موتور-پلاس»
        </h3>
        <p className="text-gray-300 text-[0.95rem] leading-7 font-light">
          خودرو شما، قلبِ دومِ زندگیِ پرمشغله‌ی شماست. در کلینیک تخصصی ما، 
          با بهره‌گیری از دستگاه‌های دیاگ پیشرفته و تیمِ مهندسیِ مجرب، 
          اصالتِ عملکردِ موتور و سلامتِ فنیِ خودروی شما را تضمین می‌کنیم. 
          اینجا، ما با دقتِ یک پزشک، عیوبِ پیچیده‌ی خودرو را شناسایی و 
          با ابزارهای دقیقِ صنعتی رفع می‌کنیم. کیفیت، اولویتِ ماست.
        </p>
      </div>
      <div>
        <ul>
            <li>شست و شوی موتور</li>
            <li>تعمیر تخصصی موتور</li>
            <li>صافکاری ماشین</li>
            <li>فطعه شویی</li>
            <li>رنگ کاری خودرو</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;