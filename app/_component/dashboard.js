"use client";
import { cn } from "@udecode/cn";
import { usePathname } from "next/navigation";

const Dashboard = ({ href, Icon, onClick }) => {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.startsWith(`${href}/`);

  return (
    <div
      className="relative group flex flex-col justify-between items-center p-3 text-gray-400 hover:bg-slate-700 rounded-md"
      onClick={onClick}
    >
      <Icon
        className={cn(
          "h-5 w-5 group-hover:text-white",
          isActive && "text-black"
        )}
      />
      {isActive && (
        <div className="absolute -bottom-1.5 h-1 w-full rounded-sm bg-black" />
      )}
    </div>
  );
};

export default Dashboard;
