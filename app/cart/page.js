"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Products } from "../api/data";

const CartPage = () => {
    const data = Products.filter(product => product.cart === true)
    const [products, setProducts] = useState(data);

    const handleQuantityChange = (id, delta) => {
        setProducts(products.map(product =>
            product.id === id
                ? { ...product, quantity: Math.max(1, product.quantity + delta) }
                : product
        ));
    };

    const handleRemoveProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="p-4 pb-16">
            <h2 className="text-lg font-bold mb-4">Giỏ hàng</h2>
            <div className="flex flex-col gap-4">
                {products.map((product) => (
                    <div key={product.id} className="group flex h-[145px] relative">
                        <div className="flex flex-1 gap-5 items-center border border-black rounded-md p-3 transition-all duration-300 group-hover:-translate-x-20">
                            <img className="w-24 h-24 object-cover" src={product.image} alt={product.name} />
                            <div>
                                <p className="font-medium">{product.name}</p>
                                <p className="text-gray-600">{product.price.toLocaleString()} đ</p>
                                <p className="text-sm text-gray-500">Đơn vị: {product.unit}</p>
                                {/* Nút tăng giảm số lượng */}
                                <div className="flex items-center gap-2 mt-2">
                                    <button className="px-3 py-1 border rounded" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button className="px-3 py-1 border rounded" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <button
                            className="hidden group-hover:flex items-center justify-center bg-red-600 w-16 h-full absolute right-0 rounded-md cursor-pointer transition-all"
                            onClick={() => handleRemoveProduct(product.id)}
                        >
                            <Trash2 className="w-6 h-6 text-white" />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
                <p className="text-lg font-semibold">Tổng tiền</p>
                <p className="text-lg font-bold text-blue-600">{totalPrice.toLocaleString()} đ</p>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md">
                THANH TOÁN
            </button>
        </div>
    );
};

export default CartPage;