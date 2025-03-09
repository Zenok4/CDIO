"use client";
import { useSession } from "@supabase/auth-helpers-react";
import { Search, ShoppingCart, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");

  const session = useSession();

  const router = useRouter();

  return (
    <div className="fixed top-0 w-full bg-white flex justify-between px-4 py-4 text-black border-b shadow-sm shadow-gray-500 z-10">
      <div className="flex gap-2 items-center">
        <img
          className="w-10 h-10 scale-150 object-cover"
          src="/logo.png"
          alt=""
          onClick={() => router.push("/")}
        />
        <input
          className="ml-2 w-[250px] border-b border-gray-300 focus:border-b-gray-600 focus:shadow-md outline-none"
          type="text"
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <Search
          className="w-5 h-5 text-black"
          onClick={() => {
            if (search !== "") {
              router.push("/search/" + search);
            }
          }}
        />
      </div>

      <div className="flex gap-4 items-center">
        <ShoppingCart
          className="w-5 h-5 text-black"
          onClick={() => router.push("/cart")}
        />
        {session ? (
          <UserCircle
            className="w-5 h-5 text-black"
            onClick={() => router.push("/profile")}
          />
        ) : (
          <div
            className="w-24 h-8 border border-black hover:bg-cyan-500 hover:text-white flex items-center justify-center text-sm font-semibold rounded-sm cursor-pointer"
            onClick={() => router.push("/login/login")}
          >
            Đăng Nhập
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
