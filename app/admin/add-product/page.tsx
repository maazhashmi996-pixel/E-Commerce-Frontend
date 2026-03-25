"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { Upload, X, CheckCircle, Info, Tag, Layers, Sparkles, PlusCircle } from "lucide-react";

export default function AddProduct() {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isNewCategory, setIsNewCategory] = useState(false);

    // Existing Categories
    const categories = [
        "Kurrendi Staff", "Pure Raw Silk 80g", "Pure Raw Silk 60g",
        "Korean Raw Silk", "Pure Cotton", "Casual Dresses"
    ];

    const [formData, setFormData] = useState({
        title: "", price: "", description: "",
        category: categories[0],
        section: "New Arrival", stock: "In Stock"
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const totalFiles = [...files, ...selectedFiles].slice(0, 5);
            setFiles(totalFiles);
            const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews].slice(0, 5));
        }
    };

    const removeImage = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) return alert("Please upload at least one image!");

        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        files.forEach((file) => data.append("images", file));

        try {
            await api.post("/products/add", data);
            alert(`Article published under ${formData.category}! 🚀`);
            window.location.reload();
        } catch (err) {
            alert("Upload failed. Check backend/cloudinary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto p-6 py-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter italic flex items-center gap-3">
                        <Sparkles className="text-yellow-500" /> Catalog Studio
                    </h1>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">D.Design Luxury Inventory</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-gray-100 border border-gray-50 space-y-8">
                        <div className="group">
                            <label className="text-[10px] font-black uppercase ml-4 mb-2 block text-gray-400 italic">Article Title</label>
                            <input
                                type="text" required placeholder="e.g. Embroidered Luxury Suit"
                                className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] outline-none focus:bg-white focus:border-black transition-all font-bold text-lg"
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div className="group">
                            <label className="text-[10px] font-black uppercase ml-4 mb-2 block text-gray-400 italic">Fabric Biography</label>
                            <textarea
                                required placeholder="Describe the craftsmanship..."
                                className="w-full p-6 bg-gray-50 border-2 border-transparent rounded-[24px] outline-none h-40 focus:bg-white focus:border-black transition-all font-medium"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Category & Pricing */}
                    <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-gray-100 border border-gray-50 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase ml-4 text-gray-400 italic flex items-center gap-2"><Tag size={12} /> Retail Price (PKR)</label>
                                <input
                                    type="number" required placeholder="0.00"
                                    className="w-full p-6 bg-gray-100 rounded-[24px] outline-none font-black text-2xl focus:ring-2 ring-black/5"
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase ml-4 text-gray-400 italic flex items-center gap-2"><Layers size={12} /> Fabric Category</label>
                                {!isNewCategory ? (
                                    <div className="flex gap-2">
                                        <select
                                            className="w-full p-6 bg-gray-100 rounded-[24px] outline-none font-black text-xs uppercase tracking-widest cursor-pointer"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => setIsNewCategory(true)}
                                            className="p-4 bg-black text-white rounded-2xl hover:scale-105 transition"
                                        >
                                            <PlusCircle size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text" autoFocus placeholder="Enter New Category"
                                            className="w-full p-6 bg-gray-100 rounded-[24px] outline-none font-black text-xs uppercase tracking-widest"
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => { setIsNewCategory(false); setFormData({ ...formData, category: categories[0] }) }}
                                            className="p-4 bg-red-50 text-red-500 rounded-2xl"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side hai */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[48px] shadow-2xl shadow-gray-100 border border-gray-50">
                        <h3 className="font-black text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">Visual Gallery ({files.length}/5)</h3>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                            {previews.map((src, i) => (
                                <div key={i} className="relative aspect-[3/4] rounded-3xl overflow-hidden group border border-gray-100">
                                    <img src={src} className="object-cover w-full h-full" alt="preview" />
                                    <button type="button" onClick={() => removeImage(i)} className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"><X /></button>
                                </div>
                            ))}
                            {files.length < 5 && (
                                <label className="aspect-[3/4] border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-black transition-all">
                                    <Upload className="text-gray-300" size={24} />
                                    <input type="file" multiple hidden onChange={handleImageChange} accept="image/*" />
                                </label>
                            )}
                        </div>
                        <button
                            disabled={loading}
                            className="w-full bg-black text-white py-6 rounded-[24px] font-black text-xs tracking-[0.3em] uppercase hover:scale-105 transition-all disabled:bg-gray-400"
                        >
                            {loading ? "UPLOADING..." : "PUBLISH ARTICLE"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}