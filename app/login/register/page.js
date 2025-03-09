"use client";
import CardComponents from "@/app/_component/card";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowRePassword = () => setShowRePassword(!showRePassword);
  const handleToggleRegister = () => setRegister(!register);

  const router = useRouter();
  const session = useSession();

  const supabase = useSupabaseClient();

  const signUp = async (email, password, userName) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Lỗi đăng ký:", error.message);
      return null;
    }

    // Nếu đăng ký thành công, lưu thông tin vào bảng profiles
    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase
        .from("users")
        .insert([{ id: user.id, email, user_name: userName }]);

      if (profileError) {
        console.error("Lỗi khi lưu profile:", profileError.message);
      }
    }
    setError(profileError || "");
    setLoading(false);
  };

  const handleRegisterSuccess = () => {
    signUp(email, password, "User");
    if (error === "") {
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      handleToggleRegister();
    }
  };

  useEffect(() => {
    if (session) router.push("/");
  }, []);

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
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <div className="relative w-80">
            <input
              className="w-full p-2 rounded-md border border-black pr-10"
              placeholder="Mật khẩu"
              type={showPassword === true ? "text" : "password"}
              onChange={(ev) => setPassword(ev.target.value)}
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
              onChange={(ev) => setPasswordConfirmation(ev.target.value)}
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
            onClick={handleRegisterSuccess}
          >
            Đăng Ký
          </button>

          <h6 className="text-gray-600 text-sm mt-2 flex gap-2">
            Đã có tài khoản?{" "}
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push("/login/login")}
            >
              Đăng Nhập Ngay.
            </p>
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
            <p className="mt-2 text-gray-700">Đang tạo tài khoản...</p>
          </div>
        </div>
      )}
    </div>
  );
}
