"use client";
import CardComponents from "@/app/_component/card";
import { Pharmacys } from "@/app/api/data";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const data = Pharmacys;
  const keyWord = useParams();

  const [pharmacys, setPharmacys] = useState(data);

  useEffect(() => {
    if (keyWord?.keyWord) {
      const filteredPharmacys = data.filter((pharmacys) =>
        pharmacys.name.toLowerCase().includes(keyWord.keyWord.toLowerCase())
      );
      setPharmacys(filteredPharmacys.length > 0 ? filteredPharmacys : []);
    } else {
      setPharmacys(data);
    }
  }, [keyWord]);

  return (
    <div className="flex flex-col items-center mt-4">
      <CardComponents title="Hiệu Thuốc">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-4 gap-x-1 gap-y-10 place-items-center">
            {pharmacys.length > 0 ?
              (pharmacys.map((pharmacy) => (
                <div key={pharmacy.id} className="flex flex-col items-center">
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
              ))) : (
                <p className="text-center">Không tìm thấy hiệu thuốc nào.</p>
              )}
          </div>
        </div>
      </CardComponents>
    </div>
  );
}
