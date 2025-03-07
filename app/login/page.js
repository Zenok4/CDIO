"use client";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-[65vh] justify-center items-center">
      <div className="w-44 flex flex-col gap-y-2 justify-between items-center">
        <CircleUser className="w-40 h-40" />
        <div
          className="flex justify-between items-center w-full h-10 bg-[#667080] rounded-lg text-white cursor-pointer hover:opacity-85"
          onClick={() => router.push("/login/login")}
        >
          <p className="w-full flex flex-col justify-between items-center">
            Đăng Nhập
          </p>
        </div>
        <p className="cursor-pointer">Tạo tài khoản mới</p>
      </div>
    </div>
  );
}
