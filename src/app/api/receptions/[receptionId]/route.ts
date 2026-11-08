import Reception from "@/models/Reception";
import User from "@/models/User";
import { authOption } from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import { p2e } from "@/utils/replaceNumber";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    receptionId: string;
  };
};

type UpdateReceptionBody = {
  ownerName?: string;
  phone?: string;
  carModel?: string;
  productionYear?: string | number;
  plateNumber?: string;
  fuelType?: "petrol" | "gasoline" | "cng" | "hybrid" | "diesel" | "dual";
  description?: string;
  services?: string[];
  images?: string[];
  reservationDate?: string | Date;
  receptionDate?: string | Date;
};

// ======================== ویرایش پذیرش (PATCH) ========================
export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    // استخراج دقیق شناسه از پوشه [receptionId]
    const { receptionId } = context.params;

    const session = await getServerSession(authOption);
    if (!session?.user?.email) {
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

    const receptionCar = await Reception.findById(receptionId);
    if (!receptionCar) {
      return NextResponse.json(
        { error: "پرونده پذیرش یافت نشد" },
        { status: 404 }
      );
    }

    if (!user._id.equals(receptionCar.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این پرونده پذیرش محدود شده است" },
        { status: 403 }
      );
    }

    const body: UpdateReceptionBody = await req.json();

    if (body.ownerName !== undefined) receptionCar.ownerName = body.ownerName.trim();
    if (body.carModel !== undefined) receptionCar.carModel = body.carModel.trim();
    if (body.plateNumber !== undefined) receptionCar.plateNumber = p2e(body.plateNumber).trim();
    if (body.fuelType !== undefined) receptionCar.fuelType = body.fuelType;
    if (body.description !== undefined) receptionCar.description = body.description.trim();
    if (body.services !== undefined) receptionCar.services = Array.isArray(body.services) ? body.services : [];
    if (body.images !== undefined) receptionCar.images = Array.isArray(body.images) ? body.images : [];

    if (body.phone !== undefined) {
      receptionCar.phone = p2e(body.phone.toString()).trim();
    }

    if (body.productionYear !== undefined) {
      receptionCar.productionYear = Number(p2e(body.productionYear.toString()));
    }

    const dateVal = body.reservationDate || body.receptionDate;
    if (dateVal !== undefined) {
      receptionCar.reservationDate = new Date(dateVal);
    }

    await receptionCar.save();

    return NextResponse.json(
      { message: "پرونده پذیرش با موفقیت ویرایش شد" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("خطا در ویرایش پذیرش:", err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است. لطفاً مجدداً تلاش کنید." },
      { status: 500 }
    );
  }
}

// ======================== حذف پذیرش (DELETE) ========================
export async function DELETE(
  _req: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { receptionId } = context.params;

    const session = await getServerSession(authOption);
    if (!session?.user?.email) {
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

    const receptionCar = await Reception.findById(receptionId);
    if (!receptionCar) {
      return NextResponse.json(
        { error: "پرونده پذیرش یافت نشد" },
        { status: 404 }
      );
    }

    if (!user._id.equals(receptionCar.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این پرونده پذیرش محدود شده است" },
        { status: 403 }
      );
    }

    await receptionCar.deleteOne();

    return NextResponse.json(
      { message: "آگهی پذیرش مورد نظر حذف شد" },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("خطا در حذف پذیرش:", err);

    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است. لطفاً مجدداً تلاش کنید." },
      { status: 500 }
    );
  }
}
