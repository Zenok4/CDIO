"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Products } from "../api/data";

const FavoritesPage = () => {
  const data = Products.filter((product) => product.favorite === true);
  const [products, setProducts] = useState(data);

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const totalPrice = products.reduce((total, product) => total + product.price, 0)

  console.log(totalPrice.toLocaleString())
  return (
    <div className=" mx-auto flex flex-col mt-10">
      {/* Danh sách sản phẩm yêu thích */}
      <div className="flex flex-col gap-4">
        {products &&
          products.map((product) => (
            <div key={product.id} className="group flex h-[145px]">
              <div className="flex flex-1 gap-5 items-center border border-black rounded-md p-2 group-hover:-translate-x-32">
                <img
                  className="w-32 h-32 object-cover"
                  src={product.image}
                  alt=""
                />
                <div>
                  <p>{product.name}</p>
                  <p className="text-gray-500">{product.price.toLocaleString()}đ</p>
                  <p className="text-gray-400">Đơn vị: {product.unit}</p>
                </div>
              </div>

              <div
                className="hidden group-hover:flex items-center justify-center hover:bg-red-600 bg-gray-600 w-36 h-full -translate-x-10 rounded-md"
                onClick={() => handleRemoveProduct(product.id)}
              >
                <Trash2 className="w-14 h-14 text-white" />
              </div>
            </div>
          ))}
      </div>
      {/* Đóng div danh sách sản phẩm */}
      {/* Tổng tiền + Nút thêm vào giỏ hàng */}
      <div className="bg-gray-800 text-white p-4 rounded-lg mt-4 flex justify-between items-center">
        <p className="text-lg">
          Tổng tiền: <span className="font-bold">{totalPrice.toLocaleString()}</span>
        </p>
        <button className="bg-blue-500 px-4 py-2 rounded-md text-white" onClick={() => console.log(totalPrice)}>
          THÊM VÀO GIỎ HÀNG
        </button>
      </div>
    </div>
  );
};

export default FavoritesPage;
