import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, Tag } from "lucide-react";

const AdminSidebar = () => {
    return (
        <div className="w-64 h-screen bg-white border-r border-gray-100 fixed left-0 top-0 p-6">
            <div className="mb-10">
                <h2 className="text-xl font-black tracking-tighter">D.DESIGN <span className="text-red-600">PRO</span></h2>
            </div>

            <nav className="space-y-2">
                <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl font-medium text-gray-600">
                    <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link href="/admin/orders" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl font-medium text-gray-600">
                    <ShoppingBag size={20} /> Orders
                </Link>
                <Link href="/admin/products" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl font-medium text-gray-600">
                    <Tag size={20} /> Products
                </Link>
                <Link href="/admin/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl font-medium text-gray-600">
                    <Settings size={20} /> Settings
                </Link>
            </nav>
        </div>
    );
};