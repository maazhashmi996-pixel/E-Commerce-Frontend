"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminHome() {
    const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, customers: 0 });

    useEffect(() => {
        // Backend se stats mangwayenge
        api.get("/admin/stats").then(res => setStats(res.data));
    }, []);

    const statCards = [
        { title: "Total Revenue", value: `Rs. ${stats.revenue}`, icon: <DollarSign />, color: "bg-green-500" },
        { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart />, color: "bg-blue-500" },
        { title: "New Customers", value: stats.customers, icon: <Users />, color: "bg-purple-500" },
        { title: "Growth", value: "+12%", icon: <TrendingUp />, color: "bg-orange-500" },
    ];

    return (
        <div>
            <div className="mb-10">
                <h2 className="text-3xl font-black text-black uppercase">Welcome Back, Admin</h2>
                <p className="text-gray-400 text-sm">Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition cursor-default">
                        <div className={`w-12 h-12 ${card.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-inherit/20`}>
                            {card.icon}
                        </div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{card.title}</p>
                        <h3 className="text-2xl font-black mt-1 text-black">{card.value}</h3>
                    </div>
                ))}
            </div>

            {/* Recent Activity Section (Example Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[40px] border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">Sales Analytics</h3>
                    <div className="h-64 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 italic text-sm">
                        Graph will be integrated here (Chart.js)
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[40px] border border-gray-100">
                    <h3 className="font-bold text-lg mb-6">System Status</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                            <span className="text-sm font-medium">Database Connection</span>
                            <span className="text-green-500 text-xs font-bold">ONLINE</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                            <span className="text-sm font-medium">Cloudinary Storage</span>
                            <span className="text-green-500 text-xs font-bold">ACTIVE</span>
                        </div>
                        <div className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                            <span className="text-sm font-medium">Order Notifications</span>
                            <span className="text-orange-500 text-xs font-bold">PAUSED</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}