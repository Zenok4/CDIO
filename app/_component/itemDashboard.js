"use client"
import { useRouter } from "next/navigation";
import Dashboard from "./dashboard";
import { Heart, Home, LayoutGrid, MessageCircle } from "lucide-react";

const listItem = [
    {
        id: "1",
        href: "/",
        icon: Home,
    },
    {
        id: "2",
        href: "/products",
        icon: LayoutGrid,
    },
    {
        id: "3",
        href: "/favorites",
        icon: Heart,
    },
    {
        id: "4",
        href: "/chat",
        icon: MessageCircle,
    }
]

const ItemDasboard = () => {
    const router = useRouter()
    return (
        <div className="fixed flex justify-between bottom-0 w-full p-6">
            {listItem.map(item => (
                <div key={item.id}>
                    <Dashboard href = {item.href} Icon = {item?.icon} onClick={() => router.push(`${item.href}`)}/>
                </div>            
            ))}
        </div>
    );
}
 
export default ItemDasboard;