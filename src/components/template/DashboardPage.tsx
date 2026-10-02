type DashboardPageProps = {
  createdAt: Date | string;
};

async function DashboardPage({ createdAt }: DashboardPageProps) {
  const joinedAt = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "long",
  }).format(new Date(createdAt));
  return (
    <div dir="rtl">
      <h3 className="mb-5 text-center text-[1.5rem] font-bold text-[#304ffe]">
        👋 سلام
      </h3>

      <p className="text-gray-700">
        درخواست خود را آنلاین ثبت کنید تا در کوتاه‌ترین زمان ممکن به نتیجه
        دلخواه خود برسید.
      </p>

      <div className="mt-48 flex w-fit items-center rounded-lg bg-[#304ffe18] px-[10px] py-[5px]">
        <p className="ml-2 font-normal text-gray-700">تاریخ عضویت:</p>

        <span className="text-[#304ffe]">{joinedAt}</span>
      </div>
    </div>
  );
}

export default DashboardPage;
