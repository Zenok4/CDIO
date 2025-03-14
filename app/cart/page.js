"use client";

import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Products } from "../api/data";
import {
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react/dist";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const data = Products.filter((product) => product.cart === true);
  const [products, setProducts] = useState(data);

  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter()

  const session_id = session?.user?.id;

  const handleQuantityChange = (id, delta) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const fetchCart = async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("id, products(id, name, price, unit, image, quantity)")
      .eq("user", session_id);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setProducts(data);
    console.log({ products });
  };

  let totalPrice = 0;
  console.log({ session_id });

  useEffect(() => {
    if (!session) return;
    fetchCart();
    totalPrice = products?.reduce(
      (total, product) =>
        total + product.products?.price * product.products?.quantity,
      0
    );
  }, [session_id]);

  console.log({ products });

  return (
    <div className="p-4 pb-16">
      <h2 className="text-lg font-bold mb-4">Giỏ hàng</h2>
      <div className="flex flex-col gap-4">
        {products?.length > 0 &&
          products.map((product, index) => (
            <div key={index} className="group flex h-[145px] relative">
              <div className="flex flex-1 gap-5 items-center border border-black rounded-md p-3 transition-all duration-300 group-hover:-translate-x-20">
                <img
                  className="w-24 h-24 object-cover"
                  src={product?.products?.image}
                  alt={product?.products?.name}
                />
                <div>
                  <p className="line-clamp-2">{product?.products?.name}</p>
                  <p className="text-gray-600">
                    {product?.products?.price?.toLocaleString()} đ
                  </p>
                  <p className="text-sm text-gray-500">
                    Đơn vị: {product?.products?.unit}
                  </p>
                  {/* Nút tăng giảm số lượng */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() =>
                        handleQuantityChange(product?.products?.id, -1)
                      }
                    >
                      -
                    </button>
                    <span>{product?.products?.quantity}</span>
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() =>
                        handleQuantityChange(product?.products?.id, 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="hidden group-hover:flex items-center justify-center bg-red-600 w-16 h-full absolute right-0 rounded-md cursor-pointer transition-all"
                onClick={() => handleRemoveProduct(product?.products?.id)}
              >
                <Trash2 className="w-6 h-6 text-white" />
              </button>
            </div>
          ))}
      </div>
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Tổng tiền</p>
        <p className="text-lg font-bold text-blue-600">
          {totalPrice?.toLocaleString()} đ
        </p>
      </div>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md" onClick={() => router.push("/pay")}>
        THANH TOÁN
      </button>
    </div>
  );
};

export default CartPage;
