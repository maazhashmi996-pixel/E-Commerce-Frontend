"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Hero from "@/Components/Hero";
import ProductCard from "@/Components/ProductCard";
import VIPBiography from "@/Components/VIPBiography";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products/all").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  // Sections filter logic
  const winterCollection = products.filter((p: any) => p.section === "Winter").slice(0, 4);
  const newArrivals = products.filter((p: any) => p.section === "New Arrival").slice(0, 8);

  return (
    <main className="bg-white min-h-screen">
      <Hero />

      <div className="max-w-[1400px] mx-auto px-4 py-20">

        {/* New Arrivals Section */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black tracking-tighter uppercase">New Arrivals</h2>
              <div className="h-1 w-20 bg-red-600 mt-2"></div>
            </div>
            <button className="text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition">VIEW ALL</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        {/* Categories Banner Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div className="relative h-[500px] group overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1470" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/10 flex items-end p-10">
              <h3 className="text-white text-4xl font-black">WINTER<br />ESSENTIALS</h3>
            </div>
          </div>
          <div className="relative h-[500px] group overflow-hidden cursor-pointer">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1440" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/10 flex items-end p-10 text-right w-full">
              <h3 className="text-white text-4xl font-black w-full text-right">LUXURY<br />PRET</h3>
            </div>
          </div>
        </div>

      </div>
      <VIPBiography />
    </main>
  );
}