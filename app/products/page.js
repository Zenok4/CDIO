"use client";

import CardComponents from "@/app/_component/card";
import { Products } from "@/app/api/data";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const supabase = useSupabaseClient()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const fetchProducts = async () => {
    let { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setProducts(data)
  }

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center py-10">
      {products?.length > 0 ? (
        <CardComponents title="Sản Phẩm">
          <div className="container mx-auto px-32 bg-gray-100 rounded-md">
            <div className="grid grid-cols-4 gap-2 place-items-center py-4">
              {products &&
                products.map((product) => (
                  <div key={product.id} className="flex flex-col items-center cursor-pointer" onClick={() => router.push(`/products/productDetail/${product.id}`)}>
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
                        {product.name} ({product.weight})
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardComponents>
      ) : (
        (loading ? <p>Đang tải...</p> : <p>Không tìm thấy sản phẩm nào"</p>)
      )}
    </div>
  );
}
