"use client"
import { Products } from "@/app/api/data";
import { useParams } from "next/navigation";
import { useState } from "react";

const ProductDetailPage = () => {
  const id = useParams()
  const data = Products.filter(product => product.id === id.productId)
  const [products, setProduct] = useState(data?.[0])

    return (  
        <div className="flex flex-col items-center mt-20 pb-20">
        {/* Image Section */}
        <div className="bg-gray-200 rounded-t-2xl w-full flex flex-col items-center justify-center relative">
          <img
            className="w-[300px] object-cover -translate-y-10"
            src= {products?.image}
            alt="Nutren Junior"
          />
        </div>
  
        {/* Product Info Section */}
        <div className="bg-white shadow-md rounded-b-2xl p-5 w-full max-w-md">
          <h2 className="text-lg font-bold text-gray-800 uppercase">
            {products?.name}
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            {products?.description}
          </p>
  
          {/* Availability Section */}
          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <p className="text-sm font-semibold uppercase">{products?.status.includes("vẫn còn") ? "CÒN HÀNG": "Hết hàng"}</p>
            <p className="text-xs text-gray-500">{products?.status}</p>
          </div>
  
          {/* Options Section */}
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">{products?.unit}</button>
          </div>
  
          {/* Price and Button */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-bold text-red-500">{products?.price.toLocaleString()}đ</span>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg">THÊM VÀO GIỎ HÀNG</button>
          </div>
        </div>
      </div>
    );
}
 
export default ProductDetailPage;