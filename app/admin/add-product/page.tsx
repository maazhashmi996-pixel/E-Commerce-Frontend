"use client";
import { useState } from "react";
import api from "@/lib/axios";
import { Upload, X, CheckCircle } from "lucide-react";

export default function AddProduct() {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "", price: "", description: "", category: "Dresses", section: "Winter"
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...selectedFiles].slice(0, 5)); // Max 5 images

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
        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        files.forEach((file) => data.append("images", file));

        try {
            await api.post("/products/add", data);
            alert("Product Published Successfully! 🚀");
            window.location.reload(); // Reset form
        } catch (err) {
            alert("Upload failed. Check backend/cloudinary.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tighter">Create New Collection</h1>
                <p className="text-gray-400">Fill in the details to list a new dress on D.DESIGN</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
                        <input
                            type="text" required placeholder="Product Title (e.g. Embroidered Kurta)"
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-black/5 transition"
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <textarea
                            required placeholder="Product Biography / Description..."
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-40 focus:ring-2 ring-black/5"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number" required placeholder="Price (PKR)"
                                className="p-4 bg-gray-50 rounded-2xl outline-none"
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                            <select
                                className="p-4 bg-gray-50 rounded-2xl outline-none font-bold"
                                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                            >
                                <option value="Winter">Winter Collection</option>
                                <option value="Summer">Summer Collection</option>
                                <option value="Eid">Eid Special</option>
                                <option value="New Arrival">New Arrival</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Upload */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                        <h3 className="font-bold mb-4 text-sm uppercase tracking-widest">Product Images (Max 5)</h3>

                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {previews.map((src, i) => (
                                <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                                    <img src={src} className="object-cover w-full h-full" />
                                    <button
                                        onClick={() => removeImage(i)}
                                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            {files.length < 5 && (
                                <label className="aspect-[3/4] border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                                    <Upload className="text-gray-300" />
                                    <span className="text-[10px] mt-2 text-gray-400 font-bold">UPLOAD</span>
                                    <input type="file" multiple hidden onChange={handleImageChange} />
                                </label>
                            )}
                        </div>

                        <button
                            disabled={loading}
                            className="w-full bg-black text-white py-4 rounded-2xl font-black text-sm hover:shadow-xl transition disabled:bg-gray-400"
                        >
                            {loading ? "UPLOADING..." : "PUBLISH PRODUCT"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}