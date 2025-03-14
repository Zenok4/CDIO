"use client";
import { Products } from "@/app/api/data";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

//Hiển thị Giao Diện Admin
const AdminDashboard = () => {
  const supabase = useSupabaseClient();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const sessionId = session?.user?.id;

  const fetchProducts = async () => {
    let { data, error } = await supabase.from("products").select("*").limit(5);
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setProducts(data);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setUsers(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [session]);

  useEffect(() => {
    fetchProducts();
  }, [loading]);

  const isAdmin = () => {
    const myAcount = users.filter((user) => user.id === sessionId)?.[0];
    console.log({ myAcount });
    if (myAcount?.role === "admin") return true;
    return false;
  };

  //fetch tài khoản trong database và xác thực role của phiên đăng nhập là của admin hay không (không phải thì chuyển ra ngoài home page).
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUsers(); // Đảm bảo dữ liệu được fetch xong
      setLoading(false);
    };

    if (session) {
      fetchData();
    }
  }, [session]); // Chỉ chạy lại khi session thay đổi

  useEffect(() => {
    if (!loading && users.length > 0) {
      const confirm = isAdmin();
      if (!confirm) {
        router.push("/");
      }
    }
  }, [users, loading]); // Chỉ chạy lại khi users đã có dữ liệu và không còn loading

  //function duyệt sản phẩm
  const handleApprove = async (id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .update({ approve: true })
      .eq("id", id);
    if (error) {
      console.error("Lỗi", error.message);
      setLoading(false);
      return null;
    }
    setLoading(false);
  };

  //function xóa sản phẩm
  const handleDelete = async (id) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Lỗi", error.message);
      setLoading(false);
      return null;
    }
    setLoading(false);
  };

  //Component Sidebar
  const Sidebar = () => {
    const router = useRouter();
    return (
      <div className="w-1/6 bg-[#dcfce7] flex flex-col items-center p-5 min-h-screen bod">
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

    return (
      <div className="p-5 w-5/6">
        <h2 className="text-xl font-bold mb-3">Mục sản phẩm</h2>
        <div className="overflow-y-auto max-h-[500px] border rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-3">ID</th>
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
  const ProductRow = ({ product}) => {
    return (
      <tr className="text-center border-b">
        <td className="p-3">{product.id}</td>
        <td className="p-3">{product.name}</td>
        <td className="p-3">{product.unit}</td>
        <td className="p-3">{product.quantity}</td>
        <td
          className={`p-3 font-bold ${
            product.approve ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.approve ? "Đã duyệt" : "Chờ xử lý"}
        </td>
        <td className="p-3">
          <div className="flex justify-center items-center gap-1">
            <button
              className={`px-4 py-2 rounded-lg ${
                product.approve
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-700"
              }`}
              onClick={() => handleApprove(product?.id)}
              disabled={product.approve}
            >
              Duyệt
            </button>
            <button
              className={`px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700`}
              onClick={() => handleDelete(product?.id)}
            >
              Xóa
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="flex h-screen bg-green-50">
      <Sidebar />
      <ProductTable products={products} setProducts={setProducts} />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
