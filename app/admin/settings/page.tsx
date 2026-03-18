"use client";
import { useState } from "react";
import { Save, Bell, ShieldCheck, Globe } from "lucide-react";

export default function AdminSettings() {
    const [activeSeason, setActiveSeason] = useState("Winter 2026");

    return (
        <div className="max-w-4xl">
            <div className="mb-10">
                <h1 className="text-3xl font-black uppercase italic">Store Settings</h1>
                <p className="text-gray-400">Configure your store's global behavior.</p>
            </div>

            <div className="space-y-6">
                {/* Season Configuration */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="bg-orange-100 p-4 rounded-2xl text-orange-600"><Globe size={24} /></div>
                        <div>
                            <h3 className="font-bold text-lg text-black">Active Collection Season</h3>
                            <p className="text-sm text-gray-400">Current season shown on Home Page categories.</p>
                        </div>
                    </div>
                    <select
                        value={activeSeason}
                        onChange={(e) => setActiveSeason(e.target.value)}
                        className="bg-gray-50 p-3 rounded-xl font-bold outline-none border-none"
                    >
                        <option>Winter 2026</option>
                        <option>Summer 2026</option>
                        <option>Eid Collection</option>
                    </select>
                </div>

                {/* Store Security */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="bg-blue-100 p-4 rounded-2xl text-blue-600"><ShieldCheck size={24} /></div>
                        <div>
                            <h3 className="font-bold text-lg text-black">Admin Authentication</h3>
                            <p className="text-sm text-gray-400">Only you can access this dashboard from the database.</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-red-500 hover:underline">Change Admin Password</button>
                </div>

                {/* Save All */}
                <button className="bg-black text-white px-10 py-4 rounded-full font-black flex items-center gap-3 shadow-lg hover:scale-105 transition">
                    <Save size={20} /> SAVE ALL CHANGES
                </button>
            </div>
        </div>
    );
}