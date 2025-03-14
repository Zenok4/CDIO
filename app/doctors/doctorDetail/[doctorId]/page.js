"use client";
import { Doctors } from "@/app/api/data";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  CircleDollarSignIcon,
  Clipboard,
  Hospital,
  ThumbsUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DoctorDetailPage = () => {
  const id = useParams();
  const supabase = useSupabaseClient();
  const [doctor, setDoctor] = useState([]);

  const fetchDoctors = async () => {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", id?.doctorId);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setDoctor(data?.[0]);
  };

  useEffect(() => {
    fetchDoctors();
  }, [id?.doctorId]);

  return (
    <div className="flex flex-col items-center mt-20 pb-20">
      {/* Header Section */}
      <div className="bg-blue-500 text-white w-full text-center py-4 rounded-t-2xl flex items-center justify-center gap-2">
        <Clipboard className="h-5 w-5" />
        <h1 className="text-xl font-bold">Thông Tin Bác Sĩ</h1>
      </div>

      {/* Image Section */}
      <div className="bg-blue-100 rounded-b-2xl w-full flex flex-col items-center justify-center relative p-5">
        <img
          className="w-[250px] object-cover rounded-lg shadow-md"
          src={doctor?.img}
          alt={doctor?.doctor_name}
        />
      </div>

      {/* Doctor Info Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md border border-gray-300">
        <h2 className="text-lg font-bold text-gray-800 uppercase flex items-center gap-2">
          {doctor?.doctor_name}
        </h2>

        {/* Availability Section */}
        <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm font-semibold uppercase text-blue-700 flex items-center gap-1">
            <CircleDollarSignIcon className="w-5 h-5" /> Giá tư vấn:
            {" "}{doctor?.price?.toLocaleString()}vnđ
          </p>
          <p className=" text-blue-400 items-center flex gap-1">
            Đánh giá: <ThumbsUp className="w-5 h-5" /> {doctor?.rate}% Hài lòng
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-blue-200 text-blue-800 rounded-lg font-semibold flex items-center gap-2">
            <Hospital className="w-5 h-5" /> Bệnh viện {doctor?.hospital}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
