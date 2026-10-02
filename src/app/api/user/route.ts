import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOption);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا ابتدا وارد حساب کاربری شوید" },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { email, phone } = body;
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "فرمت ایمیل معتبر نیست" },
        { status: 422 }
      );
    }
    if (phone && !/^0\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "شماره تماس باید ۱۱ رقم و با ۰ شروع شود" },
        { status: 422 }
      );
    }
    const updatedUser =  await User.findOneAndUpdate(
      { email: session.user?.email },
      { $set: { email, phone } },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({
      data: { email: updatedUser.email, phone: updatedUser.phone },
      message: "اطلاعات حساب با موفقیت به‌روزرسانی شد",
    });
  } catch (err: unknown) {
    console.error("User update error:", err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}

