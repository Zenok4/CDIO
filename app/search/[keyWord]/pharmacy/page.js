"use client";
import CardComponents from "@/app/_component/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react/dist";

export default function SearchPage() {
  const supabase = useSupabaseClient();
  const [pharmacys, setPharmacys] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyWord = useParams();
  const router = useRouter();

  const fetchPharmacys = async () => {
    const { data, error } = await supabase.from("pharmacys").select("*");
    if (error) {
      console.error("Error: ", error.message);
      return null;
    }
    if (keyWord?.keyWord) {
      const decodedKeyWord = decodeURIComponent(keyWord.keyWord.toLowerCase());

      // Lọc hiệu thuốc theo từ khóa
      const filteredPharmacys = data.filter((pharmacy) =>
        pharmacy?.name?.toLowerCase()?.includes(decodedKeyWord)
      );

      // Cập nhật state ngay lập tức
      setPharmacys(filteredPharmacys.length > 0 ? filteredPharmacys : []);
    } else {
      setPharmacys(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPharmacys();
    setLoading(false);
  }, [keyWord]);

  return (
    <div className="flex flex-col items-center mt-4">
      <CardComponents title="Hiệu Thuốc">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-4 gap-x-1 gap-y-10 place-items-center">
            {pharmacys.length > 0 ? (
              pharmacys.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className="flex flex-col items-center"
                  onClick={() =>
                    router.push(`/pharmacys/pharmacyDetail/${pharmacy?.id}`)
                  }
                >
                  <img
                    className="w-[320px] h-[260px] object-cover rounded-md"
                    src={pharmacy.img}
                    alt=""
                  />
                  <div className="w-[90%]">
                    <p className="pt-2 font-semibold">{pharmacy.name}</p>
                    <p className="pt-2 line-clamp-1">{pharmacy.local}</p>
                  </div>
                </div>
              ))
            ) : loading ? (
              <p className="font-semibold text-pretty">Đang tìm kiếm...</p>
            ) : (
              <p className="text-center">Không tìm thấy hiệu thuốc nào.</p>
            )}
          </div>
        </div>
      </CardComponents>
    </div>
  );
}
