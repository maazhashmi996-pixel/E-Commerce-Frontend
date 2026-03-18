"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Truck, CreditCard, Package, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Checkout() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState({
        firstName: "", lastName: "", mobile: "", streetAddress: "",
        city: "", state: "", paymentMethod: "COD"
    });

    // Cart fetch logic
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(items);
    }, []);

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handleOrder = async () => {
        if (!orderData.firstName || !orderData.mobile || !orderData.streetAddress) {
            alert("Please fill in all required fields!");
            return;
        }

        setLoading(true);
        try {
            // 1. Backend API Call
            const res = await api.post("/orders/place-order", {
                ...orderData,
                items: cartItems,
                totalAmount: total
            });

            // 2. WhatsApp Notification Logic (For Admin +923339844424)
            const message = `*NEW ORDER: D.DESIGN*%0A` +
                `*Name:* ${orderData.firstName} ${orderData.lastName}%0A` +
                `*Phone:* ${orderData.mobile}%0A` +
                `*Address:* ${orderData.streetAddress}, ${orderData.city}%0A` +
                `*Items:* ${cartItems.map(i => i.title).join(", ")}%0A` +
                `*Total:* Rs. ${total.toLocaleString()}%0A` +
                `*Tracking:* ${res.data.trackingCode}`;

            const waLink = `https://wa.me/923339844424?text=${message}`;

            // 3. Cleanup & Redirect
            localStorage.removeItem("cart");
            router.push(`/order-success?id=${res.data.trackingCode}`);

            // Open WhatsApp in new tab after redirect
            setTimeout(() => window.open(waLink, "_blank"), 1000);

        } catch (err) {
            alert("Order placement failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1300px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-28 mb-20">

            {/* Left Side: Shipping Form (8 Columns) */}
            <div className="lg:col-span-7 space-y-10">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Checkout</h2>
                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase italic">Secure delivery to your doorstep</p>
                </div>

                <div className="space-y-6">
                    <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-red-600 border-b pb-2">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 ring-black outline-none transition-all" placeholder="First Name *" onChange={(e) => setOrderData({ ...orderData, firstName: e.target.value })} />
                        <input className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 ring-black outline-none transition-all" placeholder="Last Name" onChange={(e) => setOrderData({ ...orderData, lastName: e.target.value })} />
                    </div>
                    <input className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 ring-black outline-none transition-all" placeholder="Mobile Number (e.g 0333xxxxxxx) *" onChange={(e) => setOrderData({ ...orderData, mobile: e.target.value })} />
                    <input className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 ring-black outline-none transition-all" placeholder="Street Address / House No *" onChange={(e) => setOrderData({ ...orderData, streetAddress: e.target.value })} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 ring-black outline-none transition-all" placeholder="City *" onChange={(e) => setOrderData({ ...orderData, city: e.target.value })} />
                        <input className="w-full bg-gray-50 border-none p-4 rounded-2xl focus:ring-2 ring-black outline-none transition-all" placeholder="Province" onChange={(e) => setOrderData({ ...orderData, state: e.target.value })} />
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-6">
                    <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-red-600 border-b pb-2">Payment Method</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                            onClick={() => setOrderData({ ...orderData, paymentMethod: 'COD' })}
                            className={`p-6 border-2 rounded-3xl cursor-pointer transition-all flex items-center gap-4 ${orderData.paymentMethod === 'COD' ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                        >
                            <Truck size={24} />
                            <div>
                                <p className="text-xs font-black uppercase">Cash on Delivery</p>
                                <p className="text-[9px] opacity-60 font-bold uppercase tracking-widest">Pay at your door</p>
                            </div>
                        </div>
                        <div
                            onClick={() => setOrderData({ ...orderData, paymentMethod: 'JazzCash' })}
                            className={`p-6 border-2 rounded-3xl cursor-pointer transition-all flex items-center gap-4 ${orderData.paymentMethod === 'JazzCash' ? 'border-red-600 bg-red-600 text-white shadow-xl' : 'border-gray-100 bg-white hover:border-gray-300'}`}
                        >
                            <Package size={24} />
                            <div>
                                <p className="text-xs font-black uppercase">JazzCash / Online</p>
                                <p className="text-[9px] opacity-60 font-bold uppercase tracking-widest">Instant Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Order Summary (4 Columns) */}
            <div className="lg:col-span-5 h-fit sticky top-32">
                <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm">
                    <h2 className="text-xl font-black uppercase tracking-tighter mb-8 italic">Order Summary</h2>

                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar mb-8 space-y-4 pr-2">
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                                <div className="relative w-16 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[11px] font-black uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Rs. {item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 border-t pt-6">
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Subtotal</span>
                            <span>Rs. {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Shipping</span>
                            <span className="text-green-600 font-black">FREE</span>
                        </div>
                        <div className="flex justify-between font-black text-2xl pt-4 border-t-2 border-dotted border-gray-100 tracking-tighter">
                            <span>Total</span>
                            <span className="text-black">Rs. {total.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleOrder}
                        disabled={loading || cartItems.length === 0}
                        className="w-full bg-black text-white py-6 mt-10 rounded-2xl font-black text-xs tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all hover:shadow-2xl active:scale-95 disabled:bg-gray-200"
                    >
                        {loading ? "PROCESSING..." : "CONFIRM ORDER"} <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}