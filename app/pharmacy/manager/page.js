"use client";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const PharmacyMangamentPage = () => {
  const [pharmacy, setPharmacy] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 0,
    price: 0,
    unit: "",
    image: "",
    description: "",
    weight: "",
  });
  const [namePha, setNamePha] = useState("");
  const [img, setImg] = useState("");
  const [local, setLocal] = useState("");
  const [onCreate, setOnCreate] = useState(false);

  const supabase = useSupabaseClient();

  const session = useSession();

  const fetchPharmacy = async () => {
    const { data, error } = await supabase
      .from("pharmacys")
      .select("*")
      .eq("owner", session?.user?.id);
    if (error) {
      console.error("Error fetching pharmacies:", error.message);
      return;
    }
    setPharmacy(data?.[0]);
  };

  console.log({ pharmacy });
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("pharmacy", pharmacy?.id);
    if (error) {
      console.error("Error fetching products:", error.message);
      return;
    }
    setProducts(data);
    console.log({ products });
  };

  useEffect(() => {
    if (!session) return;
    fetchPharmacy();
  }, [session]);

  useEffect(() => {
    if (pharmacy?.id) fetchProducts();
  }, [pharmacy]);

  useEffect(() => {
    if (pharmacy?.id) fetchProducts();
  }, [loading]);

  const addProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").insert([
      {
        name: newProduct.name,
        quantity: newProduct.quantity,
        price: newProduct.price,
        unit: newProduct.unit,
        image: newProduct.image,
        description: newProduct.description,
        weight: newProduct.weight,
        pharmacy: pharmacy?.id,
      },
    ]);

    if (error) {
      console.error("Error adding product:", error.message);
      return;
    }
    setNewProduct({
      name: "",
      quantity: 0,
      price: 0,
      unit: "",
      image: "",
      description: "",
      weight: "",
    });
    setLoading(false);
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);
    if (error) {
      console.error("Error deleting product:", error.message);
      return;
    }
    setLoading(false);
  };

  const createPharmacy = async () => {
    setLoading(true);
    if (namePha === "" || img === "" || local === "") {
      setLoading(false);
      alert("Vui lòng nhập đủ thông tin");
      return;
    }
    const { data, error } = await supabase.from("pharmacys").insert({
      name: namePha,
      owner: session?.user?.id,
      img: img,
      local: local,
    });
    if (error) {
      console.error("Error creating pharmacy:", error.message);
      return;
    }
    setLoading(false);
  };

  return pharmacy ? (
    <div className="p-6 mx-auto pt-10">
      <h1 className="text-2xl font-bold mb-4">
        Quản lý hiệu thuốc: {pharmacy?.name}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <input
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Giá"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
          }
          className="border p-2 rounded w-full"
        />
        <input
          placeholder="Đơn vị"
          value={newProduct.unit}
          onChange={(e) =>
            setNewProduct({ ...newProduct, unit: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Hình ảnh (URL)"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          placeholder="Khối lượng"
          value={newProduct.weight}
          onChange={(e) =>
            setNewProduct({ ...newProduct, weight: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <input
          placeholder="Mô tả"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addProduct}
          className="bg-blue-500 px-2 py-1 text-nowrap rounded-md text-white hover:bg-blue-700"
        >
          Thêm Sản Phẩm
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Tên</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Số lượng
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Giá
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Đơn vị
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Mô tả
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Khối lượng
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{prod.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {prod.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {prod.price}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {prod.unit}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {prod.description}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {prod.weight}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => deleteProduct(prod?.id)}
                  className="hover:bg-red-500 hover:text-white text-red-500 p-3 rounded-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <Loader2 className="w-10 h-10 animate-spin text-green-500" />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="p-6 mx-auto pt-10 gap-4 items-center">
      <p>Chưa có hiệu thuốc nào thuộc tài khoản này.</p>
      <button
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2"
        onClick={() => setOnCreate(!onCreate)}
      >
        Tạo hiệu thuốc
      </button>

      {onCreate && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded">
          <h3 className="text-lg font-semibold mb-4">Thêm hiệu thuốc</h3>
          <form className="flex flex-col gap-4" onSubmit={createPharmacy}>
            <input
              placeholder="Tên hiệu thuốc"
              className="border p-2 rounded"
              required
              value={namePha}
              onChange={(e) => setNamePha(e.target.value)}
            />
            <input
              placeholder="URL hình ảnh"
              className="border p-2 rounded"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <input
              placeholder="Địa chỉ"
              className="border p-2 rounded"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              Lưu
            </button>
          </form>
          <button
            className="mt-4 bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
            onClick={() => setOnCreate(!onCreate)}
          >
            Đóng
          </button>
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

export default PharmacyMangamentPage;
