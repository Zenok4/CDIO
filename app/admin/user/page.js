"use client";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const session = useSession();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const sessionId = session?.user?.id;

  //function lấy danh sách tài khoản
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Lỗi", error.message);
      return null;
    }
    setUsers(data);
  };

  //function xác nhận quyền admin
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

  //Tạo sidebar và router sang cách trang khác
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

  //Template Items của side bar
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

  //Bảng quản lý người dùng
  const UserTable = () => {
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: "", email: "" });
    const [isAdding, setIsAdding] = useState(false);

    //xóa tài khoản
    const handleDelete = async (id) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Lỗi xóa người dùng", error.message);
        setLoading(false);
        return null;
      }

      fetchUsers();
      setLoading(false);
    };

    //toggle edit user
    const handleEdit = (id) => {
      const data = users.filter((user) => user?.id === id)?.[0];
      setEditUser(data);
    };

    const handleLock = async (id, currentStatus) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .update({is_active: !currentStatus})
        .eq("id", id);

      if (error) {
        console.error("Lỗi xóa người dùng", error.message);
        setLoading(false);
        return null;
      }

      fetchUsers();
      setLoading(false);
    };

    //lưu thay đổi thông tin user
    const handleSave = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .update({ user_name: editUser?.user_name, email: editUser?.email })
        .eq("id", editUser?.id);

      if (error) {
        console.error("Lỗi xóa người dùng", error.message);
        setLoading(false);
        return null;
      }

      fetchUsers();
      setLoading(false);
    };

    const handleChange = (e) => {
      setEditUser((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleAddUser = () => {
      setIsAdding(true);
    };

    const handleSaveNewUser = async () => {
      setLoading(true);

      //tạo coppy lại session vì khi tắt xác thực email sẽ khiến supabase tự động đăng nhập tài khoản mới sau khi đăng ký
      const currentSession = await supabase.auth.getSession();

      //tạo tài khoản trong supabase
      const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: "123456",
      });
      if (error) {
        console.log("Lỗi tạo tài khoản", error.message);
        setLoading(false);
        return null;
      }

      // Đăng xuất tài khoản mới để tránh bị chuyển session
      await supabase.auth.signOut();

      // Khôi phục lại session admin cũ
      if (currentSession?.data?.session) {
        await supabase.auth.setSession(currentSession.data.session);
      }

      // Lấy user ID từ kết quả đăng ký
      const userId = data?.user?.id;

      //update lại user name của người dùng vừa tạo
      const { data: updateData, error: errorUpdate } = await supabase
        .from("users")
        .update({ user_name: newUser.name })
        .eq("id", userId);

      if (errorUpdate) {
        console.log("Lỗi cập nhật user name", errorUpdate.message);
        setLoading(false);
        return null;
      }

      setNewUser({ name: "", email: "" });
      fetchUsers();
      setLoading(false);
      setIsAdding(false);
    };

    //đổi màu dựa theo trạng thái tài khoản người dùng
    const getStatusColor = (status) => {
      switch (status) {
        case true:
          return "text-green-600";
        case false:
          return "text-red-600";
        default:
          return "";
      }
    };

    return (
      <div className="w-5/6 p-5">
        <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
        <button
          onClick={handleAddUser}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Thêm người dùng
        </button>
        <div className="overflow-y-auto max-h-96">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-600 text-white">
              <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Ngày đăng ký</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user?.id} className="text-center border-b">
                  <td className="p-2 truncate">{user?.id}</td>
                  <td>{user?.user_name}</td>
                  <td>{user?.email}</td>
                  <td
                    className={`font-bold ${getStatusColor(user?.is_active)}`}
                  >
                    {user?.is_active ? "Đang hoạt động" : "Bị khóa"}
                  </td>
                  <td>
                    {new Date(user?.created_at).toLocaleDateString("en-US")}
                  </td>
                  <td className="flex justify-around p-2">
                    <button
                      onClick={() => handleEdit(user?.id)}
                      className="px-3 py-1 border border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user?.id)}
                      className="px-3 py-1 border border-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => handleLock(user?.id, user?.is_active)}
                      className="px-3 py-1 border border-yellow-700 text-yellow-700 rounded hover:bg-yellow-700 hover:text-white"
                    >
                      Khóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-lg font-bold mb-4">Chỉnh sửa người dùng</h3>
              <label className="block mb-2">
                Họ và tên:
                <input
                  type="text"
                  name="user_name"
                  value={editUser.user_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
        {isAdding && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-lg font-bold mb-4">Thêm người dùng</h3>
              <label className="block mb-2">
                Họ và tên:
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleSaveNewUser}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

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

  return (
    <div className="flex h-screen bg-[#f0fdf4]">
      <Sidebar />
      <UserTable />
    </div>
  );
};

export default AdminPage;
