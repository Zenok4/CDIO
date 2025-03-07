"use client";
import CardComponents from "@/app/_component/card";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between items-center p-4">
      <CardComponents>
        <div className="flex flex-col gap-y-4 justify-center items-center p-6">
          {/* Tiêu đề */}
          <h6 className="text-center text-sm text-gray-600 font-semibold">
            Khi bạn quên mật khẩu của mình bạn có thể bấm vào quên mật khẩu,
            chúng tôi sẽ khôi phục lại mật khẩu cho bạn.
            <p>
              Chúng tôi sẽ không bao giờ tiết lộ thông tin bảo mật khi chưa có
              sự đồng ý của bạn.
            </p>
          </h6>

          {/* Ô nhập thông tin */}
          <input
            className="w-80 p-2 rounded-md border border-gray-300"
            placeholder="Email hoặc số điện thoại"
          />

          {/* Ô nhập mật khẩu */}
          <div className="relative w-80">
            <input
              className="w-full p-2 rounded-md border border-gray-300 pr-10"
              placeholder="Mật khẩu"
            />
            <span className="absolute right-3 top-2.5 cursor-pointer text-gray-600" />
          </div>

          {/* Ghi nhớ mật khẩu */}
          <div className="flex items-center w-80">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 accent-green-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 flex-1">
              Ghi nhớ mật khẩu
            </label>

            <p className="text-sm text-orange-700 mr-1 cursor-pointer">Quên mật khẩu.</p>
          </div>

          {/* Nút đăng nhập */}
          <button
            className="w-80 bg-green-500 text-white p-2 rounded-md font-bold hover:bg-green-600 transition"
            onClick={() => router.push("/")}
          >
            Đăng nhập
          </button>

          {/* Đăng nhập qua mạng xã hội */}
          <h6 className="flex gap-2 text-gray-500 text-sm mt-2">
            Chưa có tài khoản?
            <p
              className="text-orange-600 cursor-pointer"
              onClick={() => router.push("/login/register")}
            >
              Đăng Ký Ngay.
            </p>
          </h6>
          <p className="text-gray-500 text-sm">Hoặc</p>
          <p className="text-gray-600 text-sm">Đăng nhập qua</p>

          <div className="flex items-center gap-4 mt-2">
            {/* Đăng nhập qua Facebook */}
            <button className="w-12 h-12 rounded-full flex justify-center items-cente">
              <img src="/fb.png" alt="" />
            </button>

            {/* Đăng nhập qua Google */}
            <button className="w-14 h-14 border border-gray-300 rounded-full flex justify-center items-center">
              <img src="/gg.png" alt="" />
            </button>
          </div>
        </div>
      </CardComponents>
    </div>
  );
}
