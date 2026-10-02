import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "هیچ فایلی ارسال نشده است" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
   await mkdir(uploadDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // ایجاد نام یکتا و امن برای فایل
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const safeFileName = `${uniqueSuffix}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(uploadDir, safeFileName);

     await writeFile(filePath, buffer);
      urls.push(`/uploads/${safeFileName}`);
    }

    return NextResponse.json(
      { urls, message: "فایل‌ها با موفقیت ذخیره شدند" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "خطا در ذخیره فایل" }, { status: 500 });
  }
}
