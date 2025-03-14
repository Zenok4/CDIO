"use client";
import { useEffect, useState } from "react";
import CardComponents from "./_component/card";
import { ArrowRight, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
  const supabase = useSupabaseClient();
  const sesssion = useSession();

  const [products, setProducts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [pharmacys, setPharmacys] = useState([]);

  const router = useRouter();

  //xác nhận tài khoản có bị khóa không
  const confirmIsActive = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("id, is_active")
      .eq("id", sesssion?.user?.id);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    if (data?.[0]?.is_active === false) supabase.auth.signOut();
  };

  //render dữ liệu khi session thay đổi
  useEffect(() => {
    if (!sesssion) return;
    confirmIsActive();
  }, [sesssion]);

  const fetchPharmacys = async () => {
    const { data, error } = await supabase
      .from("pharmacys")
      .select("*")
      .limit(5);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setPharmacys(data);
  };

  const fetchProducts = async () => {
    let { data, error } = await supabase.from("products").select("*").limit(5);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setProducts(data);
  };

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from("doctors").select("*").limit(4);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setDoctors(data);
  };

  useEffect(() => {
    fetchPharmacys();
    fetchProducts();
    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col items-center py-10 relative">
      {pharmacys?.length > 0 && (
        <CardComponents title="Hiệu Thuốc Gần Đây">
          <ArrowRight className="absolute top-6 font-bold right-4 w-7 h-7" />
          <section className="w-full flex flex-col items-center pb-5">
            <div className="flex overflow-x-scroll w-full space-x-2">
              {pharmacys.map((pharmacy, index) => (
                <img
                  key={index}
                  src={pharmacy?.img}
                  alt={`Hiệu thuốc ${index + 1}`}
                  className="w-[1170px] h-[500px] rounded-lg hover:opacity-80 transition"
                  loading="lazy"
                  onClick={() =>
                    router.push(`/pharmacys/pharmacyDetail/${pharmacy?.id}`)
                  }
                />
              ))}
            </div>
          </section>
        </CardComponents>
      )}

      <div>
        {products?.length > 0 && (
          <CardComponents title="Sản Phẩm Mới">
            <ArrowRight className="absolute top-6 font-bold right-4 w-7 h-7" />
            <section className="flex flex-col items-center py-10">
              <div className="flex w-full mt-4 space-x-2">
                {products.slice(-5).map((product, index) => (
                  <div
                    className="w-full"
                    key={index}
                    onClick={() =>
                      router.push(`/products/productDetail/${product?.id}`)
                    }
                  >
                    <img
                      src={product.image}
                      alt={`Hiệu thuốc ${index + 1}`}
                      className="w-[260px] h-[250px] object-cover rounded-lg hover:opacity-80 transition"
                      loading="lazy"
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
            </section>
          </CardComponents>
        )}

        {doctors?.length > 0 && (
          <CardComponents title="Bác sĩ tư vấn">
            <ArrowRight className="absolute top-6 font-bold right-4 w-7 h-7" />
            <div className="container mx-auto px-32 rounded-md">
              <div className="grid grid-cols-4 gap-5 place-items-center py-4">
                {doctors.slice(-4).map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex flex-col bg-white p-4 rounded-lg shadow-md w-[260px] hover:shadow-lg transition"
                    onClick={() =>
                      router.push(`/doctors/doctorDetail/${doctor?.id}`)
                    }
                  >
                    <img
                      className="w-full h-[250px] rounded-lg hover:opacity-80 transition"
                      src={doctor.img}
                      alt=""
                    />
                    <p className="pt-2 font-semibold hover:text-blue-500 transition">
                      {doctor.name}
                    </p>
                    <p className="text-red-600 font-bold">{doctor.price}</p>
                    <p className="text-blue-600 flex gap-2">
                      <ThumbsUp className="w-5 h-5" /> {doctor.rate}% hài lòng
                    </p>
                    <p className="text-gray-500 text-sm">{doctor.hospital}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardComponents>
        )}
      </div>

      <section className="w-[1170px] flex flex-col items-start py-10">
        <div className="text-xl font-bold text-left w-full">
          Tư vấn sức khỏe 24H
        </div>
        <p className="text-gray-500 text-left w-full mt-2">
          Gặp ngay Bác sĩ đang khám bệnh trực tiếp tại các bệnh viện chỉ sau 30
          giây
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          {[
            "Dị ứng, mề đay, mẩn ngứa",
            "Đau họng, sổ mũi",
            "Bệnh cúm mùa",
            "Nội tiết tố nữ",
            "Mụn trứng cá",
            "Mất ngủ",
            "Táo bón",
            "Cảm lạnh",
          ].map((text, index) => (
            <button
              key={index}
              className="bg-white border text-sm cursor-pointer shadow-[2px_2px_5px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out mb-2.5 p-2.5 rounded-[20px] border-solid border-gray-300 hover:bg-blue-700 hover:text-white"
            >
              {text}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
