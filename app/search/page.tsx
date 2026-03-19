"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import ProductCard from "@/Components/ProductCard";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            api.get(`/products/search?q=${query}`).then((res) => {
                setResults(res.data);
                setLoading(false);
            });
        }
    }, [query]);

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-20">
            <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Search Results for</p>
                <h1 className="text-5xl font-black uppercase tracking-tighter mt-2 italic">"{query}"</h1>
            </div>

            {loading ? (
                <div className="h-64 flex items-center justify-center font-bold text-gray-200 animate-pulse uppercase tracking-widest text-2xl">Searching D.Design Inventory...</div>
            ) : results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {results.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 bg-gray-50 rounded-[40px]">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-300">No matching dresses found</h2>
                    <p className="text-gray-400 mt-2 text-sm uppercase font-bold tracking-widest">Try searching "Silk" or "Cotton"</p>
                </div>
            )}
        </div>
    );
}