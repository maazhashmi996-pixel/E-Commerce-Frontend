"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function TrackOrder() {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<any>(null);

    const handleTrack = async () => {
        try {
            const res = await api.get(`/orders/track/${code}`);
            setStatus(res.data);
        } catch (err) {
            alert("Invalid Code");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 border border-gray-100">
                <h1 className="text-3xl font-black text-center mb-2">TRACK ORDER</h1>
                <p className="text-center text-gray-500 mb-8 text-sm">Enter your AR-XXXX tracking code</p>

                <input
                    className="w-full border-2 border-gray-100 p-4 rounded-xl mb-4 text-center text-xl font-bold tracking-widest focus:border-black outline-none transition"
                    placeholder="TRK-827364"
                    onChange={(e) => setCode(e.target.value)}
                />

                <button onClick={handleTrack} className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-none transition">
                    CHECK STATUS
                </button>

                {status && (
                    <div className="mt-10 p-6 bg-gray-50 rounded-2xl border-l-4 border-black">
                        <p className="text-xs uppercase text-gray-400 font-bold">Current Status</p>
                        <h2 className="text-2xl font-black mt-1 text-black">{status.status}</h2>
                        <p className="text-sm text-gray-500 mt-2 italic">Last updated: {new Date(status.lastUpdate).toLocaleDateString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}