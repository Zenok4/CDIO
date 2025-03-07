"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    status: "Đang hoạt động",
    date: "14/2/2025",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    email: "b@gmail.com",
    status: "Bị khóa",
    date: "14/2/2025",
  },
  {
    id: 3,
    name: "Nguyễn Văn C",
    email: "c@gmail.com",
    status: "Đang hoạt động",
    date: "14/2/2025",
  },
];

const AdminPage = () => {
  const router = useRouter();

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
    const [users, setUsers] = useState(usersData);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: "", email: "" });
    const [isAdding, setIsAdding] = useState(false);

    const handleDelete = (id) => {
      setUsers(users.filter((user) => user.id !== id));
    };

    const handleEdit = (user) => {
      setEditUser(user);
    };

    const handleLock = (id) => {
        setUsers(users.map((user) => 
          user.id === id 
            ? { 
                ...user, 
                status: user.status === "Bị khóa" ? "Đang hoạt động" : 
                         user.status === "Đang hoạt động" ? "Bị khóa" : 
                         "Đang hoạt động" 
              } 
            : user
        ));
      };


    const handleSave = () => {
      const updatedUsers = users.map((user) =>
        user.id === editUser.id ? { ...editUser } : user
      );
      setUsers(updatedUsers);
      setEditUser(null);
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

    const handleSaveNewUser = () => {
      const newUserData = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        status: "Đang hoạt động",
        date: new Date().toLocaleDateString("vi-VN"),
      };
      setUsers([...users, newUserData]);
      setNewUser({ name: "", email: "" });
      setIsAdding(false);
    };

    //đổi màu dựa theo trạng thái tài khoảng người dùng
    const getStatusColor = (status) => {
        switch (status) {
          case "Đang hoạt động":
            return "text-green-600";
          case "Bị khóa":
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
                <tr key={user.id} className="text-center border-b">
                  <td className="p-2">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={`font-bold ${getStatusColor(user.status)}`}>{user.status}</td>
                  <td>{user.date}</td>
                  <td className="flex justify-around p-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="px-3 py-1 border border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-3 py-1 border border-red-700 text-red-700 rounded hover:bg-red-700 hover:text-white"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => handleLock(user.id)}
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
                  name="name"
                  value={editUser.name}
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
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-green-200">
      <Sidebar />
      <UserTable />
    </div>
  );
};

export default AdminPage;
