"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/axios";
import { Search, Package, Truck, CheckCircle, MapPin, AlertCircle, Clock } from "lucide-react";

function TrackContent() {
    const searchParams = useSearchParams();
    const [code, setCode] = useState(searchParams.get("id") || "");
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleTrack = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!code) return;

        setLoading(true);
        setError(false);
        try {
            const res = await api.get(`/orders/track/${code}`);
            setStatus(res.data);
        } catch (err) {
            setError(true);
            setStatus(null);
        } finally {
            setLoading(false);
        }
    };

    // Agar URL mein ID pehle se ho to auto-search ho jaye
    useEffect(() => {
        if (code) handleTrack();
    }, []);

    const steps = ["Pending", "Shipped", "Delivered"];
    const currentIdx = status ? steps.indexOf(status.status) : -1;

    return (
        <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 py-32">
            <div className="max-w-2xl w-full">

                {/* Search Card */}
                <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[40px] p-10 border border-gray-50 mb-10">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Track Parcel</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">D.Design Luxury Logistics</p>
                    </div>

                    <form onSubmit={handleTrack} className="relative group">
                        <input
                            className="w-full bg-gray-50 border-2 border-transparent p-6 rounded-3xl mb-4 text-center text-xl font-black tracking-widest focus:bg-white focus:border-black outline-none transition-all duration-300 uppercase placeholder:text-gray-200"
                            placeholder="AR-827364"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                        />
                        <button
                            disabled={loading}
                            className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-none active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
                        >
                            {loading ? "SEARCHING..." : <><Search size={18} /> CHECK STATUS</>}
                        </button>
                    </form>

                    {error && (
                        <div className="mt-6 flex items-center justify-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-widest animate-bounce">
                            <AlertCircle size={14} /> Invalid Tracking Code. Try Again.
                        </div>
                    )}
                </div>

                {/* Tracking Result Card */}
                {status && (
                    <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.05)] rounded-[40px] p-10 border border-gray-50 animate-fadeIn space-y-12">

                        {/* Header Info */}
                        <div className="flex justify-between items-start border-b pb-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Name</p>
                                <h2 className="text-2xl font-black uppercase tracking-tight">{status.firstName} {status.lastName}</h2>
                            </div>
                            <div className="text-right space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated</p>
                                <p className="text-xs font-bold text-black">{new Date(status.updatedAt || status.lastUpdate).toLocaleDateString()}</p>
                            </div>
                        </div>

                        {/* Professional Progress Tracker */}
                        <div className="relative flex justify-between items-center px-4 py-6">
                            {/* Background Line */}
                            <div className="absolute h-1 bg-gray-100 w-[85%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0" />
                            {/* Active Line */}
                            <div
                                className="absolute h-1 bg-black transition-all duration-1000 ease-out left-[7.5%] top-1/2 -translate-y-1/2 z-0"
                                style={{ width: `${currentIdx === 0 ? '0%' : currentIdx === 1 ? '42.5%' : '85%'}` }}
                            />

                            {steps.map((step, i) => (
                                <div key={step} className="relative z-10 flex flex-col items-center gap-4">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${i <= currentIdx ? 'bg-black text-white' : 'bg-gray-100 text-gray-300'}`}>
                                        {i === 0 && <Package size={22} />}
                                        {i === 1 && <Truck size={22} />}
                                        {i === 2 && <CheckCircle size={22} />}
                                    </div>
                                    <div className="text-center">
                                        <p className={`text-[9px] font-black uppercase tracking-widest ${i <= currentIdx ? 'text-black' : 'text-gray-300'}`}>{step}</p>
                                        {i === currentIdx && <p className="text-[8px] text-green-600 font-bold uppercase tracking-tighter animate-pulse mt-1">Active</p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Extra Detail Card */}
                        <div className="bg-gray-50 p-6 rounded-3xl flex items-center gap-5">
                            <div className="p-4 bg-white rounded-2xl shadow-sm">
                                <MapPin size={24} className="text-black" />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Delivery To</p>
                                <p className="text-xs font-bold text-gray-700 uppercase leading-relaxed mt-1">{status.streetAddress}, {status.city}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Main component with Suspense for Next.js SearchParams
export default function TrackOrder() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black uppercase italic tracking-widest">Loading Logistics...</div>}>
            <TrackContent />
        </Suspense>
    );
}