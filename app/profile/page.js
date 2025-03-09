"use client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);

  const supabase = useSupabaseClient()

  const router = useRouter();

  const OptionItem = ({ icon, label, value, onClick }) => {
    return (
      <div
        className="flex justify-between items-center text-gray-700 cursor-pointer hover:bg-slate-100"
        onClick={onClick}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{icon}</span>
          <span>{label}</span>
        </div>
        {value && <span className="text-gray-500 text-sm">{value}</span>}
      </div>
    );
  };

  const signOut = async () => {
    setLoading(true);
    const {data, error} = await supabase.auth.signOut();
    if(error){
      console.error("Lỗi đăng xuất:", error.message);
      setLoading(false);
      return null;
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <div className="relative w-full flex items-center justify-between">
        <MoveLeft
          className=" absolute w-5 h-5 top-2 left-2 cursor-pointer"
          onClick={() => router.back()}
        />
        <h2 className="text-lg font-semibold mx-auto">Profile</h2>
      </div>

      {/* Avatar */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-500 text-3xl">👤</span>
        </div>
        <h3 className="text-lg font-semibold mt-2">Lorem ipsum</h3>
        <p className="text-gray-500 text-sm">lorem.ipsum@gmail.com</p>
      </div>

      {/* Account Options */}
      <div className="mt-6 w-full max-w-sm bg-white p-4 rounded-lg shadow">
        <div className="space-y-3">
          <OptionItem icon="💰" label="Điểm tích lũy" value="0 điểm" />
          <OptionItem icon="⚕️" label="Hồ sơ y tế" />
          <OptionItem icon="🏷️" label="Mã giảm giá" />
          <OptionItem icon="🛒" label="Lịch sử mua hàng" />
        </div>
      </div>

      {/* More Options */}
      <div className="mt-4 w-full max-w-sm bg-white p-4 rounded-lg shadow">
        <div className="space-y-3">
          <OptionItem icon="⚙️" label="Cài đặt" />
          <OptionItem
            icon="🔒"
            label="Admin Mode"
            onClick={() => router.push("/admin/products")}
          />
          <OptionItem icon="🌍" label="Ngôn ngữ" value="Tiếng Việt" />
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="mt-6 w-full max-w-sm py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg cursor-pointer"
        onClick={signOut}
      >
        ĐĂNG XUẤT
      </button>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
            <p className="mt-2 text-gray-700">Đang đăng xuất...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
