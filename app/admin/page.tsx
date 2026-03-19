"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { TrendingUp, Users, ShoppingCart, DollarSign, Loader2, Database, Cloud, BellOff } from "lucide-react";

// --- Types & Interfaces (Moving outside to prevent re-renders) ---
interface StatusCardProps {
    label: string;
    status: string;
    icon: React.ReactNode;
    color: string;
    active: boolean;
}

export default function AdminHome() {
    // Stats state with default values
    const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, customers: 0 });
    const [orders, setOrders] = useState([]); // State for orders data
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);

                // Fetching both stats and orders simultaneously to sync with backend routes
                const [statsRes, ordersRes] = await Promise.all([
                    api.get("/orders/stats/summary"),
                    api.get("/orders/all")
                ]);

                setStats(statsRes.data);
                setOrders(ordersRes.data);
            } catch (err) {
                console.error("Dashboard data load nahi ho sakay:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const statCards = [
        {
            title: "Total Revenue",
            value: `Rs. ${stats.revenue.toLocaleString()}`,
            icon: <DollarSign size={24} />,
            color: "bg-emerald-500",
            shadow: "shadow-emerald-200"
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: <ShoppingCart size={24} />,
            color: "bg-blue-600",
            shadow: "shadow-blue-200"
        },
        {
            title: "Total Customers",
            value: stats.customers,
            icon: <Users size={24} />,
            color: "bg-violet-600",
            shadow: "shadow-violet-200"
        },
        {
            title: "Growth rate",
            value: "+12.5%",
            icon: <TrendingUp size={24} />,
            color: "bg-orange-500",
            shadow: "shadow-orange-200"
        },
    ];

    return (
        <div className="p-4 md:p-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Section */}
            <div className="mb-10">
                <h2 className="text-4xl font-black text-black uppercase tracking-tighter">
                    Admin Dashboard
                </h2>
                <p className="text-gray-400 text-sm font-medium">
                    Monitor your <span className="text-black font-bold">AssanRishta</span> store performance.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-7 rounded-[35px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                        <div className={`w-14 h-14 ${card.color} text-white rounded-[20px] flex items-center justify-center mb-6 shadow-xl ${card.shadow} group-hover:scale-110 transition-transform duration-500`}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : card.icon}
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                            {card.title}
                        </p>
                        <h3 className="text-3xl font-black text-black tracking-tighter">
                            {loading ? "---" : card.value}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Visual Analytics & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[45px] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-black text-sm uppercase tracking-widest text-black">Sales Analytics</h3>
                            <p className="text-xs text-gray-400 mt-1 font-medium">Monthly revenue visualization</p>
                        </div>
                        <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter">
                            Real-time
                        </div>
                    </div>
                    <div className="h-72 bg-[#FAFAFA] rounded-[35px] flex flex-col items-center justify-center border-2 border-dashed border-gray-100">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <TrendingUp className="text-gray-300" size={24} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Chart Integration Coming Soon</p>
                    </div>
                </div>

                {/* Infrastructure Status */}
                <div className="bg-white p-8 rounded-[45px] border border-gray-100 shadow-sm">
                    <h3 className="font-black text-sm uppercase tracking-widest text-black mb-8">System Health</h3>
                    <div className="space-y-3">
                        <StatusCard
                            label="MongoDB Atlas"
                            status="Live"
                            icon={<Database size={16} />}
                            color="text-emerald-500"
                            active
                        />
                        <StatusCard
                            label="Vercel Edge"
                            status="Active"
                            icon={<Cloud size={16} />}
                            color="text-emerald-500"
                            active
                        />
                        <StatusCard
                            label="Email Server"
                            status="Paused"
                            icon={<BellOff size={16} />}
                            color="text-orange-500"
                            active={false}
                        />
                    </div>

                    <button className="w-full mt-8 py-4 bg-black text-white rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-black/10">
                        System Report
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Reusable Status Card Component (Moved outside for clean architecture) ---
function StatusCard({ label, status, icon, color, active }: StatusCardProps) {
    return (
        <div className="flex justify-between items-center p-5 bg-[#FAFAFA] rounded-[24px] border border-gray-50 hover:border-black/5 transition-all group">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-white shadow-sm text-gray-400 group-hover:text-black transition-colors`}>
                    {icon}
                </div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${active ? 'animate-pulse bg-emerald-500' : 'bg-orange-500'}`} />
                <span className={`${color} text-[10px] font-black uppercase tracking-widest`}>{status}</span>
            </div>
        </div>
    );
}