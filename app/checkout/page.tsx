"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function Checkout() {
    const [orderData, setOrderData] = useState({
        firstName: "", lastName: "", mobile: "", streetAddress: "",
        city: "", state: "", paymentMethod: "COD"
    });

    const handleOrder = async () => {
        // Cart items localstorage se uthayenge
        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
        const total = cartItems.reduce((acc: number, item: any) => acc + item.price, 0);

        try {
            const res = await api.post("/orders/place-order", {
                ...orderData,
                items: cartItems,
                totalAmount: total
            });
            alert(`Order Successful! Your Tracking ID: ${res.data.trackingCode}`);
            localStorage.removeItem("cart"); // Clear cart
        } catch (err) {
            alert("Order failed!");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 mt-24">
            {/* Left: Shipping Details */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input className="border p-3 rounded" placeholder="First Name" onChange={(e) => setOrderData({ ...orderData, firstName: e.target.value })} />
                    <input className="border p-3 rounded" placeholder="Last Name" onChange={(e) => setOrderData({ ...orderData, lastName: e.target.value })} />
                </div>
                <input className="w-full border p-3 rounded" placeholder="Mobile Number" onChange={(e) => setOrderData({ ...orderData, mobile: e.target.value })} />
                <input className="w-full border p-3 rounded" placeholder="Street Address" onChange={(e) => setOrderData({ ...orderData, streetAddress: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                    <input className="border p-3 rounded" placeholder="City" onChange={(e) => setOrderData({ ...orderData, city: e.target.value })} />
                    <input className="border p-3 rounded" placeholder="State/Province" onChange={(e) => setOrderData({ ...orderData, state: e.target.value })} />
                </div>

                {/* Payment Method */}
                <h2 className="text-xl font-bold mt-8">Payment Method</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setOrderData({ ...orderData, paymentMethod: 'COD' })}
                        className={`flex-1 p-4 border rounded ${orderData.paymentMethod === 'COD' ? 'border-black bg-gray-50' : ''}`}
                    >
                        Cash on Delivery
                    </button>
                    <button
                        onClick={() => setOrderData({ ...orderData, paymentMethod: 'JazzCash' })}
                        className={`flex-1 p-4 border rounded ${orderData.paymentMethod === 'JazzCash' ? 'border-black bg-gray-50' : ''}`}
                    >
                        JazzCash / Online
                    </button>
                </div>
            </div>

            {/* Right: Order Summary */}
            <div className="bg-gray-50 p-8 rounded-xl h-fit">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                {/* Yahan cart items map honge */}
                <div className="border-t pt-4 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>Rs. Calculation Here</span>
                </div>
                <button onClick={handleOrder} className="w-full bg-black text-white py-4 mt-8 rounded-lg hover:bg-gray-800 transition">
                    PLACE ORDER NOW
                </button>
            </div>
        </div>
    );
}