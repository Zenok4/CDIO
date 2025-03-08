"use client";

import CardComponents from "@/app/_component/card";
import { Doctors, Pharmacys, Products } from "@/app/api/data";
import { cn } from "@udecode/cn";
import { Menu, ThumbsUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductSearchPage() {
  const pro = Products;
  const doc = Doctors;
  const pha = Pharmacys;

  const keyWord = useParams();
  const router = useRouter();
  const searchTerm = keyWord?.keyWord
    ? decodeURIComponent(keyWord.keyWord)
    : "";

  const [products, setProducts] = useState(pro);
  const [doctors, setDoctors] = useState(doc);
  const [pharmacys, setPharmacys] = useState(pha);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (keyWord?.keyWord) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const filteredProducts = pro.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );

      const filteredDoctors = doc.filter((doctor) =>
        doctor.name.toLowerCase().includes(lowerCaseSearchTerm)
      );

      const filteredPharmacys = pha.filter((pharmacy) =>
        pharmacy.name.toLowerCase().includes(lowerCaseSearchTerm)
      );

      console.log("Sản phẩm tìm thấy:", filteredPharmacys); // Kiểm tra dữ liệu lọc

      setProducts(filteredProducts.length > 0 ? filteredProducts : []);
      setDoctors(filteredDoctors.length > 0 ? filteredDoctors : []);
      setPharmacys(filteredPharmacys.length > 0 ? filteredPharmacys : []);
    } else {
      setProducts(pro);
      setDoctors(doc);
      setPharmacys(pha);
    }
  }, [keyWord]);

  return (
    <div className="flex flex-col items-center py-10 relative"  onClick={() => {console.log(hide); setHide(!hide)}}>
      <div className="absolute flex justify-between gap-2 right-10 top-10 z-10">
          <div className={cn("bg-white border p-2 mt-1 transition-all transition-discrete duration-300 rounded-md", hide && "opacity-0")}>
            <p
              className="border-b hover:bg-slate-500 hover:text-white cursor-pointer px-1 transition-all duration-200"
              onClick={() => router.push(`/search/${searchTerm.toLowerCase()}/products`)}
            >
              Thuốc
            </p>
            <p className="border-b hover:bg-slate-500 hover:text-white cursor-pointer px-1 transition-all duration-200"
              onClick={() => router.push(`/search/${searchTerm.toLowerCase()}/pharmacy`)}>
              Hiệu Thuốc
            </p>
            <p className="border-b hover:bg-slate-500 hover:text-white cursor-pointer px-1 transition-all duration-200"
              onClick={() => router.push(`/search/${searchTerm.toLowerCase()}/doctor`)}>
              Bác Sĩ
            </p>
          </div>
        <Menu className="w-10 h-10" />
      </div>
      {products?.length > 0 || pharmacys?.length > 0 || doctors?.length > 0 ? (
        <div>
          {products.length > 0 && (
            <CardComponents title="Sản Phẩm">
              <div className="container mx-auto px-32 bg-gray-100 rounded-md">
                <div className="grid grid-cols-4 gap-2 place-items-center py-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-col items-center"
                      onClick={() =>
                        router.push(`/products/productDetail/${product.id}`)
                      }
                    >
                      <img
                        className="w-[260px] h-[260px] object-cover rounded-md"
                        src={product.image}
                        alt=""
                      />
                      <div className="w-[70%]">
                        <p className="pt-2 font-semibold">
                          {product.price.toLocaleString()}đ
                        </p>
                        <p className="pt-2 line-clamp-1">
                          {product.description} ({product.weight})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardComponents>
          )}
          {pharmacys?.length > 0 && (
            <CardComponents title="Hiệu Thuốc">
              <div className="container mx-auto px-32 bg-gray-100 rounded-md">
                <div className="grid grid-cols-4 gap-2 place-items-center py-4">
                  {pharmacys.map((pharmacy) => (
                    <div
                      key={pharmacy.id}
                      className="flex flex-col items-center"
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
                  ))}
                </div>
              </div>
            </CardComponents>
          )}

          {doctors?.length > 0 && (
            <CardComponents title="Bác sĩ tư vấn">
              <div className="container mx-auto px-32 bg-gray-100 rounded-md">
                <div className="grid grid-cols-4 gap-2 place-items-center py-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id}>
                      <img
                        className="w-[260px] h-[300px] object-cover rounded-md"
                        src={doctor.img}
                        alt=""
                      />
                      <p className="pt-2">{doctor.name}</p>
                      <p className="pt-2">{doctor.price}</p>
                      <p className="pt-2 text-blue-400 flex gap-2">
                        <ThumbsUp className="w-5 h-5" /> {doctor.rate}% hài lòng
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardComponents>
          )}
        </div>
      ) : (
        <p>Không tìm thấy kết quả nào với từ khoá "{keyWord?.keyWord}"</p>
      )}
    </div>
  );
}
