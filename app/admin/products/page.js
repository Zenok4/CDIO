"use client";
import { Products } from "@/app/api/data";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

//Component Sidebar
const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="w-1/6 bg-green-100 flex flex-col items-center p-5 min-h-screen">
      <div className="mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <SidebarItem
        label="Trang chủ"
        icon="/home.png"
        onClick={() => router.push("/")}
      />
      <SidebarItem
        label="Sản phẩm"
        icon="/list.png"
        onClick={() => router.push("/admin/products")}
      />
      <SidebarItem
        label="Người dùng"
        icon="/user.png"
        onClick={() => router.push("/admin/user")}
      />
    </div>
  );
};

//Templates Sidebar
const SidebarItem = ({ label, icon, onClick }) => {
  return (
    <div
      className="flex items-center w-full p-3 rounded-lg hover:bg-green-300 cursor-pointer"
      onClick={onClick}
    >
      <img src={icon} alt={label} className="w-6 h-6 mr-3" />
      <p className="font-bold text-lg">{label}</p>
    </div>
  );
};

//Tạo bảng quản lý sản phẩm và các chức năng duyệt, xóa sản phẩm
const ProductTable = ({ products, setProducts }) => {
  const handleApprove = (index) => {
    alert(`Sản phẩm "${products[index].name}" đã được duyệt!`);
    const updatedProducts = [...products];
    updatedProducts[index].status = "Đã duyệt";
    setProducts(updatedProducts);
  };

  const handleDelete = (index) => {
    alert(`Sản phẩm "${products[index].name}" đã bị xóa!`);
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="p-5 w-5/6">
      <h2 className="text-xl font-bold mb-3">Mục sản phẩm</h2>
      <div className="overflow-y-auto max-h-[500px] border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3">STT</th>
              <th className="p-3">Tên sản phẩm</th>
              <th className="p-3">Kích thước</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductRow
                  key={index}
                  index={index}
                  product={product}
                  handleApprove={handleApprove}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-5 text-gray-500">
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//Tạo hàng của từng sản phẩm trong bảng
const ProductRow = ({ index, product, handleApprove, handleDelete }) => {
  return (
    <tr className="text-center border-b">
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.unit}</td>
      <td className="p-3">{product.quantity}</td>
      <td
        className={`p-3 font-bold ${
          product.status === "Đã xóa"
            ? "text-red-500"
            : product.status === "Đã duyệt"
            ? "text-green-500"
            : ""
        }`}
      >
        {product.status || "Chờ xử lý"}
      </td>
      <td className="p-3 flex justify-around">
        <button
          className={`px-4 py-2 rounded-lg ${
            product.status === "Đã duyệt"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-700"
          }`}
          onClick={() => handleApprove(index)}
          disabled={product.status === "Đã duyệt"}
        >
          Duyệt
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            product.status === "Đã xóa"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-700"
          }`}
          onClick={() => handleDelete(index)}
          disabled={product.status === "Đã xóa"}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

//Hiển thị Giao Diện Admin
const AdminDashboard = () => {
    const data = Products.map(product => ({
        ...product,
        status: "Chờ xử lý",
      }));
      
  const [products, setProducts] = useState(data);

  return (
    <div className="flex h-screen bg-green-50">
      <Sidebar />
      <ProductTable products={products} setProducts={setProducts} />
    </div>
  );
};

export default AdminDashboard;
