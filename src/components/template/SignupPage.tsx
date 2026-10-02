"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ThreeDots } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== rePassword) {
      toast.error("رمز عبور و تکرار رمز عبور با هم برابر نیستند");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, phone: phoneNumber, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success("ثبت‌نام با موفقیت انجام شد 🎉");
        router.push("/signin");
      } else {
        toast.error(data.error || "خطا در ثبت‌نام");
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : "مشکلی در سرور رخ داده است";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h4 className="text-[#304ffe] font-semibold text-[2rem] mb-5">
        فرم ثبت نام
      </h4>

      <form
        onSubmit={signupHandler}
        className="flex flex-col max-w-[700px] shadow-[0_4px_15px_rgba(48,79,254,0.29)] border-2 border-[#304ffe] p-10 rounded-xl mb-[30px]"
      >
        <label htmlFor="email" className="text-[#304ffe] mb-2.5 font-normal">
          ایمیل:
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-10 w-[250px] border border-dashed border-[#304ffe] text-gray-500 rounded-md p-2.5 [direction:ltr] text-base h-10 focus:border-solid focus:border-[#304ffe] focus:outline-none"
        />

        <label htmlFor="phone" className="text-[#304ffe] mb-2.5 font-normal">
          شماره تماس:
        </label>
        <input
          id="phone"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-10 w-[250px] border border-dashed border-[#304ffe] text-gray-500 rounded-md p-2.5 [direction:ltr] text-base h-10 focus:border-solid focus:border-[#304ffe] focus:outline-none"
        />

        <label htmlFor="password" className="text-[#304ffe] mb-2.5 font-normal">
          رمز عبور:
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-10 w-[250px] border border-dashed border-[#304ffe] text-gray-500 rounded-md p-2.5 [direction:ltr] text-base h-10 focus:border-solid focus:border-[#304ffe] focus:outline-none"
        />

        <label
          htmlFor="rePassword"
          className="text-[#304ffe] mb-2.5 font-normal"
        >
          تکرار رمز عبور:
        </label>
        <input
          id="rePassword"
          type="password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="mb-10 w-[250px] border border-dashed border-[#304ffe] text-gray-500 rounded-md p-2.5 [direction:ltr] text-base h-10 focus:border-solid focus:border-[#304ffe] focus:outline-none"
        />

        {loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#304ffe"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ margin: "auto" }}
            wrapperClass="custom-loader"
            visible={true}
          />
        ) : (
          <button
            type="submit"
            className="border-none bg-[#304ffe] text-white text-[1.2rem] font-normal rounded-md transition-all ease-in duration-100 cursor-pointer py-2 hover:scale-105"
          >
            ثبت نام
          </button>
        )}
      </form>

      <p className="text-gray-500 text-[1.1rem]">
        حساب کاربری دارید؟
        <Link
          href="/signin"
          className="text-[#304ffe] mr-2.5 border-b-[3px] border-gray-500"
        >
          ورود
        </Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SignupPage;
