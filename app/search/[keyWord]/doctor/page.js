"use client"
import CardComponents from "@/app/_component/card";
import { Doctors } from "@/app/api/data";
import { ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const data = Doctors;

  const [doctors, setDoctors] = useState(data);
  const keyWord = useParams();

  useEffect(() => {
    if (keyWord?.keyWord) {
      const filteredDoctors = data.filter((doctors) =>
        doctors.name.toLowerCase().includes(keyWord.keyWord.toLowerCase())
      );
      setDoctors(filteredDoctors.length > 0 ? filteredDoctors : []);
    } else {
      setDoctors(data);
    }
  }, [keyWord]);
  return (
    <div className="flex flex-col items-center mt-4">
      <CardComponents title="Bác Sĩ Tư Vấn">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-4 gap-6 place-items-center">
            {doctors?.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor.id}>
                  <img
                    className="w-[260px] h-[300px] object-cover rounded-md"
                    src={doctor.img}
                    alt=""
                  />
                  <p className="pt-2">{doctor.name}</p>
                  <p className="pt-2">Giá Tiền: {doctor.price}</p>
                  <p className="pt-2 text-blue-400 flex gap-2">
                    <ThumbsUp className="w-5 h-5" /> {doctor.rate}% hài lòng
                  </p>
                </div>
              ))
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
