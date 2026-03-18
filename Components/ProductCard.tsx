"use client";
import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const ProductCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const { addToCart } = useCart();

    // Price formatting
    const formattedPrice = product.price.toLocaleString();

    return (
        <div
            className="group relative bg-white overflow-hidden transition-all duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* --- Image Container --- */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F9F9] rounded-2xl">
                <Link href={`/product/${product._id}`}>
                    {/* Main Image */}
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className={`object-cover transition-opacity duration-700 ease-in-out ${isHovered && product.images[1] ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    {/* Hover Image (Second Picture) */}
                    {product.images[1] && (
                        <Image
                            src={product.images[1]}
                            alt={`${product.title} hover`}
                            fill
                            className={`object-cover transition-opacity duration-700 ease-in-out absolute inset-0 ${isHovered ? "opacity-100 scale-105" : "opacity-0"
                                }`}
                        />
                    )}
                </Link>

                {/* Badges (Admin side se handle honge) */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isOutOfStock ? (
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-lg">
                            SOLD OUT
                        </span>
                    ) : (
                        <span className="bg-white/90 backdrop-blur-md text-black text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase shadow-sm">
                            {product.section}
                        </span>
                    )}
                </div>

                {/* Quick Action Overlay (Glassmorphism) */}
                <div className={`absolute bottom-4 left-4 right-4 flex gap-2 transition-all duration-500 transform ${isHovered ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}>
                    <button
                        disabled={product.isOutOfStock}
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-white/90 backdrop-blur-md hover:bg-black hover:text-white text-black py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingBag size={16} /> ADD TO BAG
                    </button>
                    <Link href={`/product/${product._id}`} className="p-3 bg-white/90 backdrop-blur-md hover:bg-black hover:text-white text-black rounded-xl transition-all">
                        <Eye size={16} />
                    </Link>
                </div>
            </div>

            {/* --- Product Info --- */}
            <div className="mt-5 space-y-1 text-center">
                <div className="flex justify-center items-center gap-2 mb-1">
                    <span className="h-[1px] w-4 bg-gray-200"></span>
                    <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">{product.category}</p>
                    <span className="h-[1px] w-4 bg-gray-200"></span>
                </div>

                <Link href={`/product/${product._id}`}>
                    <h3 className="text-sm font-medium text-gray-800 uppercase tracking-wide group-hover:text-red-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex flex-col items-center">
                    <p className="text-lg font-black text-black">Rs. {formattedPrice}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <Heart size={12} className="text-red-500 fill-red-500" />
                        <span className="text-[10px] font-bold text-gray-400">{product.likes || 0} LIKES</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;