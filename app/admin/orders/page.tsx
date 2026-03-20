"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react";

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0 });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders/all");
            setOrders(res.data);

            const revenue = res.data.reduce((acc: number, curr: any) => acc + curr.totalAmount, 0);
            setStats({ totalOrders: res.data.length, totalRevenue: revenue });
        } catch (err) {
            console.error("Orders fetch nahi ho sakay");
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            await api.put(`/admin/update-order/${orderId}`, { status: newStatus });
            alert("Status Updated! ✅");
            fetchOrders();
        } catch (err) {
            alert("Update fail hogaya");
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-xs">Total Revenue</p>
                        <h2 className="text-4xl font-black text-black mt-1">Rs. {stats.totalRevenue.toLocaleString()}</h2>
                    </div>
                    <div className="bg-green-50 p-4 rounded-2xl text-green-600">
                        <CheckCircle size={32} />
                    </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 font-medium uppercase tracking-wider text-xs">Orders Received</p>
                        <h2 className="text-4xl font-black text-black mt-1">{stats.totalOrders}</h2>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
                        <Package size={32} />
                    </div>
                </div>
            </div>

            {/* --- Orders Table --- */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Recent Orders</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-5">Order ID / Tracking</th>
                                <th className="p-5">Customer Details</th>
                                <th className="p-5">Items</th>
                                <th className="p-5">Total</th>
                                <th className="p-5">Status</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order: any) => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition">
                                    <td className="p-5">
                                        <span className="font-bold text-black block">{order.trackingCode}</span>
                                        <span className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleString()}</span>
                                    </td>
                                    <td className="p-5 text-sm">
                                        <div className="font-semibold">{order.customerDetails.firstName} {order.customerDetails.lastName}</div>
                                        <div className="text-gray-500">{order.customerDetails.mobile}</div>
                                        <div className="text-[10px] text-gray-400 truncate w-40">{order.customerDetails.streetAddress}, {order.customerDetails.city}</div>
                                    </td>
                                    <td className="p-5 text-sm font-medium">{order.items.length} Items</td>
                                    <td className="p-5 font-bold text-black">Rs. {order.totalAmount}</td>
                                    <td className="p-5">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-5 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="bg-gray-100 text-xs font-bold p-2 rounded-lg outline-none cursor-pointer border-none"
                                        >
                                            <option value="Order Placed">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}