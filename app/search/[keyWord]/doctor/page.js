"use client";
import CardComponents from "@/app/_component/card";
import { useSupabaseClient } from "@supabase/auth-helpers-react/dist";
import { ThumbsUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const supabase = useSupabaseClient();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const keyWord = useParams();
  const router = useRouter();

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from("doctors").select("*");
    if (error) {
      console.error("Error: ", error.message);
      return null;
    }
    if (keyWord?.keyWord) {
      const decodedKeyWord = decodeURIComponent(keyWord.keyWord.toLowerCase());

      // Lọc bác sĩ theo từ khóa
      const filteredDoctors = data.filter((doctor) =>
        doctor?.doctor_name?.toLowerCase()?.includes(decodedKeyWord)
      );

      // Cập nhật state ngay lập tức
      setDoctors(filteredDoctors.length > 0 ? filteredDoctors : []);
    } else {
      setDoctors(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDoctors();
    setLoading(false);
  }, [keyWord]);

  return (
    <div className="flex flex-col items-center mt-4">
      <CardComponents title="Bác Sĩ Tư Vấn">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-4 gap-6 place-items-center">
            {doctors?.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor?.id}>
                  <img
                    className="w-[260px] h-[300px] object-cover rounded-md"
                    src={doctor?.img}
                    alt=""
                    onClick={() =>
                      router.push(`/doctors/doctorDetail/${doctor?.id}`)
                    }
                  />
                  <p className="pt-2">{doctor?.doctor_name}</p>
                  <p className="pt-2">
                    Giá Tiền: {doctor?.price?.toLocaleString()} vnd
                  </p>
                  <p className="pt-2 text-blue-400 flex gap-2">
                    <ThumbsUp className="w-5 h-5" /> {doctor?.rate}% hài lòng
                  </p>
                </div>
              ))
            ) : loading ? (
              <p className="font-semibold text-pretty">Đang tìm kiếm...</p>
            ) : (
              <p className="text-center text-gray-600">
                Không tìm thấy bác sĩ nào
              </p>
            )}
          </div>
        </div>
      </CardComponents>
    </div>
  );
}
