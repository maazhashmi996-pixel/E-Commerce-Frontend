"use client";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Tag, Settings, LogOut, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
        { name: "Orders", icon: <ShoppingBag size={20} />, path: "/admin/orders" },
        { name: "Products", icon: <Tag size={20} />, path: "/admin/products" },
        { name: "Add Product", icon: <PlusCircle size={20} />, path: "/admin/add-product" },
        { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
    ];

    return (
        <div className="flex min-h-screen bg-[#FDFDFD]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 fixed h-full z-20 hidden md:block">
                <div className="p-8">
                    <h1 className="text-2xl font-black tracking-tighter text-black">
                        D.DESIGN <span className="text-red-600">PRO</span>
                    </h1>
                </div>

                <nav className="mt-4 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${pathname === item.path
                                    ? "bg-black text-white shadow-lg shadow-black/20"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                                }`}
                        >
                            {item.icon}
                            <span className="font-semibold text-sm">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 w-full px-8">
                    <button className="flex items-center gap-4 text-red-500 font-bold text-sm hover:opacity-70 transition">
                        <LogOut size={20} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-10">
                {children}
            </main>
        </div>
    );
}