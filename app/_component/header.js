"use client"
import { AlignLeft, ShoppingCart, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {

    const router = useRouter()

    return (
        <div className="fixed top-0 w-full flex justify-between px-4 py-4 text-black border-b shadow-sm shadow-gray-500">
            <AlignLeft className="w-5 h-5 text-black"/>
            <div className="flex gap-4">
                <ShoppingCart className="w-5 h-5 text-black" onClick={() => router.push("/cart")}/>
                <UserCircle className="w-5 h-5 text-black" onClick={() => router.push("/profile")}/>
            </div>
        </div>
    );
}
 
export default Header;