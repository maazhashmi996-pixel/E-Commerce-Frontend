"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/axios";
import { Heart, ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function ProductDetails({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<any>(null);
    const [activeImg, setActiveImg] = useState(0);
    const { addToCart } = useCart();

    useEffect(() => {
        api.get(`/products/${params.id}`).then((res) => {
            setProduct(res.data);
        });
    }, [params.id]);

    if (!product) return <div className="h-screen flex items-center justify-center font-bold italic uppercase tracking-widest">Loading...</div>;

    return (
        <div className="max-w-[1400px] mx-auto px-4 pt-32 pb-20">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* --- Left: Image Gallery --- */}
                <div className="flex flex-col-reverse lg:flex-row gap-4 lg:w-[60%]">
                    {/* Thumbnails (Side wali 4-5 pics) */}
                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
                        {product.images.map((img: string, i: number) => (
                            <div
                                key={i}
                                className={`relative w-20 h-24 cursor-pointer border-2 transition ${activeImg === i ? 'border-black' : 'border-transparent'}`}
                                onClick={() => setActiveImg(i)}
                            >
                                <Image src={img} alt="thumb" fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    {/* Main Display Image */}
                    <div className="relative flex-1 aspect-[3/4] bg-gray-50 overflow-hidden group">
                        <Image
                            src={product.images[activeImg]}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                        />
                    </div>
                </div>

                {/* --- Right: Product Info --- */}
                <div className="lg:w-[40%] space-y-8">
                    <div>
                        <div className="flex justify-between items-start">
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{product.section}</p>
                            <Heart className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
                        </div>
                        <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">{product.title}</h1>
                        <p className="text-2xl font-light text-gray-900 italic underline underline-offset-8 decoration-red-600 decoration-4">
                            PKR {product.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Description / Biography */}
                    <div className="space-y-4">
                        <h3 className="font-bold uppercase text-sm border-b pb-2">Details</h3>
                        <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                            {product.description}
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 font-bold hover:bg-gray-800 transition shadow-xl active:scale-95"
                    >
                        <ShoppingBag size={20} />
                        ADD TO BAG
                    </button>

                    {/* Additional Info (Accordion Style) */}
                    <div className="border-t pt-6 space-y-4 text-sm font-medium">
                        <div className="flex justify-between cursor-pointer group">
                            <span>Size Guide</span>
                            <ChevronRight className="group-hover:translate-x-1 transition" size={18} />
                        </div>
                        <div className="flex justify-between cursor-pointer group">
                            <span>Delivery & Returns</span>
                            <ChevronRight className="group-hover:translate-x-1 transition" size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}