import Reception from "@/models/Reception";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { p2e } from "@/utils/replaceNumber";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "@/utils/authOptions";

type CreateReceptionBody = {
  ownerName: string;
  phone: string;
  carModel: string;
  productionYear: string | number;
  plateNumber: string;
  fuelType: "petrol" | "gasoline" | "cng" | "hybrid" | "diesel" | "dual";
  description?: string;
  services?: string[];
  images?: string[];
  reservationDate: string | Date;
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOption);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "لطفاً ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );
    }

    const body: CreateReceptionBody = await req.json();
    const {
      ownerName,
      phone,
      carModel,
      productionYear,
      plateNumber,
      fuelType,
      description = "",
      services = [],
      images = [],
      reservationDate,
    } = body;

    // اعتبارسنجی فیلدهای ضروری پذیرش خودرو
    if (
      !ownerName ||
      !phone ||
      !carModel ||
      !productionYear ||
      !plateNumber ||
      !fuelType ||
      !reservationDate
    ) {
      return NextResponse.json(
        { error: "لطفاً تمام فیلدهای ستاره‌دار و ضروری را تکمیل کنید" },
        { status: 400 }
      );
    }

    // تمیزکاری و تبدیل اعداد فارسی به انگلیسی
    const cleanPhone = p2e(String(phone)).trim();
    const cleanPlate = p2e(String(plateNumber)).trim();
    const cleanYear = Number(p2e(String(productionYear)));
    const cleanReservationDate = new Date(reservationDate);

    if (isNaN(cleanYear) || cleanYear < 1350 || cleanYear > 1410) {
      return NextResponse.json(
        { error: "سال تولید خودرو نامعتبر است" },
        { status: 400 }
      );
    }

    if (isNaN(cleanReservationDate.getTime())) {
      return NextResponse.json(
        { error: "تاریخ رزرو نوبت نامعتبر است" },
        { status: 400 }
      );
    }

    // ثبت پرونده پذیرش جدید در دیتابیس
    const newReception = await Reception.create({
      ownerName: ownerName.trim(),
      phone: cleanPhone,
      carModel: carModel.trim(),
      productionYear: cleanYear,
      plateNumber: cleanPlate,
      fuelType,
      description: description.trim(),
      services: Array.isArray(services) ? services : [],
      images: Array.isArray(images) ? images : [],
      reservationDate: cleanReservationDate,
      userId: new Types.ObjectId(user._id),
    });

    return NextResponse.json(
      {
        message: "پذیرش خودرو با موفقیت ثبت شد",
        data: newReception,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("خطا در ثبت پذیرش:", err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است. لطفاً مجدداً تلاش کنید." },
      { status: 500 }
    );
  }
}
