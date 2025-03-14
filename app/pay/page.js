"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setStep(step + 1);
  };

  const handlePayment = () => {
    alert("🎉 Đặt hàng thành công!");
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">🛒 Thanh Toán</h1>

      {/* Thanh hiển thị bước */}
      <div className="flex justify-between mb-4">
        <span
          className={`px-3 py-1 rounded ${
            step === 1 ? "bg-orange-500 text-white" : "bg-gray-300"
          }`}
        >
          1. Thông tin
        </span>
        <span
          className={`px-3 py-1 rounded ${
            step === 2 ? "bg-orange-500 text-white" : "bg-gray-300"
          }`}
        >
          2. Thanh toán
        </span>
        <span
          className={`px-3 py-1 rounded ${
            step === 3 ? "bg-orange-500 text-white" : "bg-gray-300"
          }`}
        >
          3. Xác nhận
        </span>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            📌 Nhập thông tin giao hàng
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ nhận hàng"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            onClick={handleNext}
            className="w-full bg-orange-500 text-white p-2 rounded font-semibold"
          >
            Tiếp tục
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            💳 Chọn phương thức thanh toán
          </h2>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="momo"
                checked={formData.paymentMethod === "momo"}
                onChange={handleChange}
              />
              Ví MoMo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={formData.paymentMethod === "credit"}
                onChange={handleChange}
              />
              Thẻ tín dụng / Ghi nợ
            </label>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setStep(1)}
              className="w-1/2 bg-gray-500 text-white p-2 rounded"
            >
              Quay lại
            </button>
            <button
              onClick={() => setStep(3)}
              className="w-1/2 bg-orange-500 text-white p-2 rounded font-semibold"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">📦 Xác nhận đơn hàng</h2>
          <p>
            <strong>Họ tên:</strong> {formData.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {formData.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {formData.address}
          </p>
          <p>
            <strong>Thanh toán:</strong>{" "}
            {formData.paymentMethod === "cod" ? "COD" : formData.paymentMethod}
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setStep(2)}
              className="w-1/2 bg-gray-500 text-white p-2 rounded"
            >
              Quay lại
            </button>
            <button
              onClick={handlePayment}
              className="w-1/2 bg-green-500 text-white p-2 rounded font-semibold"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
