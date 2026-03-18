"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Trash2, Edit, EyeOff, Eye } from "lucide-react";

export default function ManageProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await api.get("/products/all");
        setProducts(res.data);
    };

    const toggleStock = async (id: string, currentStatus: boolean) => {
        try {
            await api.put(`/products/update/${id}`, { isOutOfStock: !currentStatus });
            fetchProducts(); // Refresh list
        } catch (err) { alert("Error updating stock"); }
    };

    const deleteProduct = async (id: string) => {
        if (window.confirm("Are you sure? Ye product hamesha k liye delete ho jaye ga.")) {
            await api.delete(`/products/delete/${id}`);
            fetchProducts();
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black italic">MANAGE INVENTORY</h1>
                <button className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm">+ ADD NEW DRESS</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item: any) => (
                    <div key={item._id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                        <img src={item.images[0]} className="w-24 h-32 object-cover rounded-2xl" />
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 uppercase text-sm">{item.title}</h3>
                            <p className="text-red-600 font-black text-lg">Rs. {item.price}</p>
                            <p className="text-[10px] text-gray-400 mt-1">Section: {item.section}</p>

                            <div className="flex gap-3 mt-4">
                                {/* Out of Stock Toggle */}
                                <button
                                    onClick={() => toggleStock(item._id, item.isOutOfStock)}
                                    className={`p-2 rounded-lg ${item.isOutOfStock ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}
                                >
                                    {item.isOutOfStock ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>

                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteProduct(item._id)}
                                    className="p-2 bg-red-50 text-red-600 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}