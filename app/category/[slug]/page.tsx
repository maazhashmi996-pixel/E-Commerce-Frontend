"use client";
import { useEffect, useState, use } from "react";
import api from "@/lib/axios";
import ProductCard from "@/Components/ProductCard";
import { SlidersHorizontal, ArrowLeft, LayoutGrid, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    // Next.js 15+ standard: Unwrap params using React.use()
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Slug formatting (e.g., "pure-raw-silk-80g" -> "Pure Raw Silk 80g")
    // Formatting to Capitalize first letters for a more premium look
    const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/products/category/${slug}`);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryProducts();
    }, [slug]);

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            {/* Header Section */}
            <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-12">

                {/* Breadcrumb / Back */}
                <Link href="/" className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-all mb-6 group w-fit">
                    <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" /> Back to Collections
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-10">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-yellow-600/80">
                            <Sparkles size={14} />
                            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Premium Selection</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
                            {categoryName}
                        </h1>
                        <p className="text-gray-400 text-[10px] font-bold tracking-[0.1em] uppercase max-w-sm leading-relaxed">
                            A curated selection of {categoryName} pieces, designed for the modern silhouette.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-5 py-3 bg-gray-50 rounded-full border border-gray-100">
                            <LayoutGrid size={12} className="text-black" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{products.length} Articles</span>
                        </div>
                        <button className="flex items-center gap-2.5 px-6 py-3.5 bg-black text-white rounded-full text-[9px] font-black tracking-[0.2em] hover:bg-gray-800 transition-all uppercase shadow-lg shadow-black/5">
                            <SlidersHorizontal size={12} /> Filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid Area */}
            <div className="max-w-[1400px] mx-auto px-6 pb-24">
                {loading ? (
                    /* Skeleton Loading State */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="space-y-4 animate-pulse">
                                <div className="aspect-[3/4] bg-gray-100 rounded-[24px]"></div>
                                <div className="h-3 bg-gray-100 rounded-full w-2/3"></div>
                                <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {products.map((product: any) => (
                            <div key={product._id} className="animate-fadeIn transition-all duration-700">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
                        <div className="p-6 bg-white rounded-full shadow-sm">
                            <LayoutGrid size={32} className="text-gray-200" />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Coming Soon</h2>
                            <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Masterpieces are being curated for this category.</p>
                        </div>
                        <Link href="/" className="px-8 py-3.5 bg-black text-white rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-red-600 transition-all">
                            View Collections
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}