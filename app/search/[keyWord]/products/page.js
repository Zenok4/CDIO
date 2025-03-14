"use client";

import CardComponents from "@/app/_component/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react/dist";

export default function ProductSearchPage() {
  const supabase = useSupabaseClient();
  const [products, setProducts] = useState([]);
  const keyWord = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error: ", error.message);
      return null;
    }
    if (keyWord?.keyWord) {
      const decodedKeyWord = decodeURIComponent(keyWord.keyWord.toLowerCase());

      // Lọc sản phẩm theo từ khóa
      const filteredProducts = data.filter((product) =>
        product?.name?.toLowerCase()?.includes(decodedKeyWord)
      );

      // Cập nhật state ngay lập tức
      setProducts(filteredProducts.length > 0 ? filteredProducts : []);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, [keyWord]);

  return (
    <div className="flex flex-col items-center py-10">
      {products?.length > 0 ? (
        <CardComponents title="Sản Phẩm">
          <div className="container mx-auto px-32 bg-gray-100 rounded-md">
            <div className="grid grid-cols-4 gap-2 place-items-center py-4">
              {products &&
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col items-center cursor-pointer"
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
      ) : !loading ? (
        <p className="font-semibold text-pretty">Đang tìm kiếm...</p>
      ) : (
        <p>Không tìm thấy sản phẩm nào với từ khoá "{keyWord?.productId}"</p>
      )}
    </div>
  );
}
