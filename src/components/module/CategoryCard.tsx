import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  name: string;
  title: string;
}

function CategoryCard({ name, title }: CategoryCardProps) {
  return (
    <Link
      href={`/services/${name}`}
      className="group flex flex-col items-center p-4 bg-slate-50 border border-slate-200/90 rounded-2xl hover:border-blue-500 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
    >
      <div className="relative w-full h-36 overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
        {/* فرض بر اینه که تصاویر در پوشه public/images/ با نام‌های engine.png, diagnostic.png و ... قرار دارن */}
        <Image
          src={`/images/${name}.png`}
          alt={title}
          width={240}
          height={144}
          priority={true}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <p className="mt-3 font-semibold text-slate-700 group-hover:text-blue-600 transition-colors text-base text-center">
        {title}
      </p>
    </Link>
  );
}

export default CategoryCard;
