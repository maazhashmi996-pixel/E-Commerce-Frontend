"use client";
import { useCart } from "../app/context/CartContext";
import { X, ShoppingBag, Trash2, ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const CartDrawer = () => {
    const { cart, isCartOpen, setIsCartOpen, cartTotal, removeFromCart } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex justify-end">
            {/* --- Smooth Blur Overlay --- */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500"
                onClick={() => setIsCartOpen(false)}
            />

            {/* --- Main Drawer --- */}
            <div className="relative w-full max-w-[450px] bg-white h-full shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-500 ease-out transform translate-x-0">

                {/* Header: Clean & Bold */}
                <div className="px-8 py-10 flex justify-between items-center bg-white border-b border-gray-50">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-black">My Shopping Bag</h2>
                        <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mt-1 italic">{cart.length} ITEMS SELECTED</p>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="group p-3 bg-gray-50 hover:bg-black rounded-full transition-all duration-300"
                    >
                        <X size={20} className="group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Body: Premium List Layout */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="relative w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                                <ShoppingBag size={50} className="text-gray-200" />
                                <div className="absolute inset-0 border-2 border-dashed border-gray-200 rounded-full animate-spin-slow" />
                            </div>
                            <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Your bag is currently empty</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="px-8 py-3 border-2 border-black text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                                Back to Collection
                            </button>
                        </div>
                    ) : (
                        cart.map((item: any, index: number) => (
                            <div key={index} className="flex gap-6 group animate-fadeIn">
                                {/* Product Image with Hover Zoom */}
                                <div className="relative w-28 h-36 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-[13px] uppercase tracking-wide text-gray-900 leading-snug">
                                                {item.title}
                                            </h4>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-gray-300 hover:text-red-600 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">
                                            {item.section}
                                        </p>
                                    </div>

                                    {/* Quantity & Price Row */}
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center border border-gray-100 rounded-lg px-2 py-1 gap-3">
                                            <Minus size={12} className="cursor-pointer text-gray-400" />
                                            <span className="text-xs font-bold w-4 text-center">1</span>
                                            <Plus size={12} className="cursor-pointer text-gray-400" />
                                        </div>
                                        <p className="font-black text-[15px] text-black tracking-tight">Rs. {item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer: Checkout Summary */}
                {cart.length > 0 && (
                    <div className="px-8 py-10 border-t border-gray-100 bg-white">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.3em]">Total Value</span>
                            <div className="text-right">
                                <span className="text-3xl font-black text-black tracking-tighter block">Rs. {cartTotal.toLocaleString()}</span>
                                <span className="text-[9px] text-green-600 font-bold uppercase tracking-widest mt-1 italic">FREE DELIVERY APPLIED</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            onClick={() => setIsCartOpen(false)}
                            className="group w-full bg-black text-white py-6 rounded-2xl font-black text-xs tracking-[0.2em] flex items-center justify-center gap-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 active:scale-95"
                        >
                            COMPLETE ORDER
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </Link>

                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="w-full text-center mt-6 text-[9px] font-black uppercase tracking-[0.4em] text-gray-300 hover:text-black transition-colors"
                        >
                            Continue Browsing
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;