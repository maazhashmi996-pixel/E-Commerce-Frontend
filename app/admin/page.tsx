"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
    TrendingUp, Users, ShoppingCart, DollarSign,
    Loader2, Database, Cloud, BellOff, Search,
    Trash2, Package, CheckCircle, RefreshCcw
} from "lucide-react";

// --- Types & Interfaces ---
interface StatusCardProps {
    label: string;
    status: string;
    icon: React.ReactNode;
    color: string;
    active: boolean;
}

export default function AdminHome() {
    // States for data
    const [stats, setStats] = useState({ totalOrders: 0, revenue: 0, customers: 0 });
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // Search State

    const loadDashboardData = async () => {
        try {
            setLoading(true);
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

    useEffect(() => {
        loadDashboardData();
    }, []);

    // Filter Logic for Search Bar
    const filteredOrders = orders.filter((order) => {
        const customerName = `${order.customerDetails?.firstName} ${order.customerDetails?.lastName}`.toLowerCase();
        const trackingCode = order.trackingCode?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return customerName.includes(query) || trackingCode.includes(query);
    });

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await api.put(`/orders/update-status/${id}`, { status: newStatus });
            loadDashboardData();
        } catch (err) {
            alert("Status update fail ho gaya!");
        }
    };

    const deleteOrder = async (id: string) => {
        if (!confirm("Kya aap waqai ye order delete karna chahte hain?")) return;
        try {
            await api.delete(`/orders/delete/${id}`);
            loadDashboardData();
        } catch (err) {
            alert("Delete nahi ho saka!");
        }
    };

    const statCards = [
        { title: "Total Revenue", value: `Rs. ${stats.revenue.toLocaleString()}`, icon: <DollarSign size={24} />, color: "bg-emerald-500", shadow: "shadow-emerald-200" },
        { title: "Total Orders", value: stats.totalOrders, icon: <ShoppingCart size={24} />, color: "bg-blue-600", shadow: "shadow-blue-200" },
        { title: "Total Customers", value: stats.customers, icon: <Users size={24} />, color: "bg-violet-600", shadow: "shadow-violet-200" },
        { title: "Growth rate", value: "+12.5%", icon: <TrendingUp size={24} />, color: "bg-orange-500", shadow: "shadow-orange-200" },
    ];

    return (
        <div className="p-4 md:p-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-4xl font-black text-black uppercase tracking-tighter">Admin Dashboard</h2>
                    <p className="text-gray-400 text-sm font-medium">
                        Monitor your <span className="text-black font-bold">AssanRishta</span> performance.
                    </p>
                </div>
                {/* Search Bar UI */}
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search Tracking ID or Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[20px] shadow-sm focus:ring-0 focus:border-black transition-all outline-none text-sm font-bold"
                    />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-7 rounded-[35px] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                        <div className={`w-14 h-14 ${card.color} text-white rounded-[20px] flex items-center justify-center mb-6 shadow-xl ${card.shadow} group-hover:scale-110 transition-transform duration-500`}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : card.icon}
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{card.title}</p>
                        <h3 className="text-3xl font-black text-black tracking-tighter">{loading ? "---" : card.value}</h3>
                    </div>
                ))}
            </div>

            {/* Orders Management Table */}
            <div className="bg-white p-8 rounded-[45px] border border-gray-100 shadow-sm mb-12 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black text-sm uppercase tracking-widest text-black">Order Management</h3>
                    <button onClick={loadDashboardData} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black">
                        <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">ID</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 font-bold text-[11px] text-black tracking-tighter">{order.trackingCode}</td>
                                    <td className="py-5">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-black">{order.customerDetails?.firstName} {order.customerDetails?.lastName}</span>
                                            <span className="text-[10px] text-gray-400 font-medium">{order.customerDetails?.city}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-xs font-black text-black">Rs. {order.totalAmount}</td>
                                    <td className="py-5">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-xl border-none focus:ring-2 focus:ring-black cursor-pointer appearance-none transition-all ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                order.status === 'Order Placed' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                                                }`}
                                        >
                                            <option value="Order Placed">Placed</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="py-5 text-right space-x-2">
                                        <button onClick={() => deleteOrder(order._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center justify-center">
                            <Package className="text-gray-100 mb-4" size={48} />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No orders matching your search</p>
                        </div>
                    )}
                </div>
            </div>

            {/* System Health Section */}
            <div className="bg-white p-8 rounded-[45px] border border-gray-100 shadow-sm lg:w-1/3">
                <h3 className="font-black text-sm uppercase tracking-widest text-black mb-8">System Health</h3>
                <div className="space-y-3">
                    <StatusCard label="MongoDB Atlas" status="Live" icon={<Database size={16} />} color="text-emerald-500" active />
                    <StatusCard label="Vercel Edge" status="Active" icon={<Cloud size={16} />} color="text-emerald-500" active />
                    <StatusCard label="Email Server" status="Paused" icon={<BellOff size={16} />} color="text-orange-500" active={false} />
                </div>
            </div>
        </div>
    );
}

// --- Reusable Components ---
function StatusCard({ label, status, icon, color, active }: StatusCardProps) {
    return (
        <div className="flex justify-between items-center p-5 bg-[#FAFAFA] rounded-[24px] border border-gray-50 hover:border-black/5 transition-all group">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-white shadow-sm text-gray-400 group-hover:text-black transition-colors">{icon}</div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-tight">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${active ? 'animate-pulse bg-emerald-500' : 'bg-orange-500'}`} />
                <span className={`${color} text-[10px] font-black uppercase tracking-widest`}>{status}</span>
            </div>
        </div>
    );
}