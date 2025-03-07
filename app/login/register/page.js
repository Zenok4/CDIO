"use client";
import CardComponents from "@/app/_component/card";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [register, setRegister] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowRePassword = () => setShowRePassword(!showRePassword);
  const handleToggleRegister = () => setRegister(!register);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-between items-center">
      <CardComponents>
        <div className="flex flex-col gap-y-4 justify-between items-center">
          <h1 className="text-2xl font-bold pb-4">Tạo Tài Khoản</h1>
          <p className="text-center text-sm text-gray-600">
            Mật khẩu ít nhất 6 ký tự bao gồm chữ hoa, chữ thường, ký tự đặc biệt
            và ít nhất 1 chữ số.
          </p>

          {/* Ô nhập thông tin */}
          <input
            className="w-80 p-2 rounded-md border border-black"
            placeholder="Email hoặc số điện thoại"
          />
          <div className="relative w-80">
            <input
              className="w-full p-2 rounded-md border border-black pr-10"
              placeholder="Mật khẩu"
              type={showPassword === true ? "text" : "password"}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword === true ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeClosed className="w-5 h-5" />
              )}
            </span>
          </div>
          <div className="relative w-80">
            <input
              className="w-full p-2 rounded-md border border-black pr-10"
              placeholder="Nhập lại mật khẩu"
              type={showRePassword === true ? "text" : "password"}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={handleShowRePassword}
            >
              {showRePassword === true ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeClosed className="w-5 h-5" />
              )}
            </span>
          </div>

          {/* Ghi nhớ mật khẩu */}
          <div className="flex items-center w-80">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-green-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
              Ghi nhớ mật khẩu
            </label>
          </div>

          {/* Nút đăng ký */}
          <button
            className="w-80 bg-green-500 text-white p-2 rounded-md font-bold"
            onClick={handleToggleRegister}
          >
            Đăng Ký
          </button>

          <h6 className="text-gray-600 text-sm mt-2 flex gap-2">
            Đã có tài khoản?{" "}
            <p className="text-blue-500 cursor-pointer" onClick={() => router.push("/login/login")}>Đăng Nhập Ngay.</p>
          </h6>
          <p className="text-gray-500 text-sm">Hoặc</p>
          <p className="text-gray-600 text-sm">Đăng ký qua</p>

          {/* Các nút đăng ký qua mạng xã hội */}
          <div className="flex gap-4 mt-2 mb-14">
            {/* Đăng ký qua Facebook */}
            <button className="w-12 h-12 rounded-full flex justify-center items-center">
              <img src="/fb.png" alt="" />
            </button>

            {/* Đăng ký qua Google */}
            <button className="w-12 h-12 border border-gray-300 rounded-full flex justify-center items-center">
              <img src="/gg.png" alt="" />
            </button>
          </div>

          {register && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-lg font-bold mb-4">
                  Đăng ký thành công. Đăng nhập ngay
                </h3>
                <div
                  className="flex justify-end space-x-2"
                  onClick={() => router.push("/login/login")}
                >
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardComponents>
    </div>
  );
}
