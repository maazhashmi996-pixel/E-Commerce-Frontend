"use client";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, Menu, X, ArrowRight, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { setIsCartOpen, cart } = useCart();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const categories = [
        "Kurrendi Staff", "Pure Raw Silk 80g", "Pure Raw Silk 60g",
        "Korean Raw Silk", "Pure Cotton", "Casual Dresses"
    ];

    const formatSlug = (cat: string) => cat.toLowerCase().replace(/ /g, '-');

    return (
        <>
            <nav className={`fixed top-0 w-full z-[80] transition-all duration-700 ease-in-out ${scrolled ? "bg-white/70 backdrop-blur-xl shadow-lg py-1" : "bg-white py-4"
                }`}>
                {/* Elite Announcement Bar */}
                {!scrolled && (
                    <div className="bg-[#0a0a0a] text-white text-[8px] font-bold py-2 text-center tracking-[0.6em] uppercase overflow-hidden border-b border-white/10">
                        <div className="animate-pulse inline-block">
                            Complimentary Luxury Packaging on all orders — Shop the Eid Collection 2026
                        </div>
                    </div>
                )}

                <div className="max-w-[1650px] mx-auto px-6 lg:px-16 flex items-center justify-between h-16">

                    {/* Left: Desktop Search & Hamburger */}
                    <div className="flex items-center gap-10 flex-1">
                        <button
                            onClick={() => setMobileMenu(true)}
                            className="p-2.5 hover:bg-black hover:text-white rounded-full transition-all duration-500 group"
                        >
                            <Menu size={20} strokeWidth={1.2} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>

                        <div
                            className="hidden lg:flex items-center gap-3 cursor-pointer group relative"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search size={16} className="group-hover:text-red-600 transition-colors" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-all">Search</span>
                            <span className="absolute -bottom-1 left-7 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-500"></span>
                        </div>
                    </div>

                    {/* Center: Brand Identity */}
                    <Link href="/" className="flex flex-col items-center group perspective-1000 px-10">
                        <span className="text-2xl md:text-4xl font-black tracking-[-0.1em] transition-all duration-700 group-hover:tracking-[0.1em] leading-none uppercase italic">
                            D.DESIGN<span className="text-red-600 animate-pulse">.</span>
                        </span>
                        <div className="h-[1px] w-0 group-hover:w-full bg-black transition-all duration-700 mt-0.5"></div>
                        <span className="text-[6px] font-black tracking-[0.8em] text-gray-300 uppercase mt-1.5 transition-colors group-hover:text-red-600">Est. 2026</span>
                    </Link>

                    {/* Right: Premium Links & Cart */}
                    <div className="flex items-center justify-end gap-14 flex-1">
                        <div className="hidden xl:flex items-center gap-12">
                            {categories.slice(0, 3).map((cat) => (
                                <Link
                                    key={cat}
                                    href={`/category/${formatSlug(cat)}`}
                                    className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-black hover:-translate-y-0.5 ${pathname.includes(formatSlug(cat)) ? "text-black" : "text-gray-400"
                                        }`}
                                >
                                    {cat}
                                    {pathname.includes(formatSlug(cat)) && (
                                        <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-red-600 animate-in slide-in-from-left duration-500"></span>
                                    )}
                                </Link>
                            ))}
                        </div>

                        <button
                            className="relative flex items-center gap-2 group p-2 hover:bg-black rounded-full transition-all duration-500"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag size={20} strokeWidth={1.2} className="group-hover:text-white transition-colors" />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-600 text-white text-[7px] w-4 h-4 rounded-full flex items-center justify-center font-black ring-2 ring-white group-hover:ring-black">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* VIP Full-Screen Mobile Menu - Updated Text Sizes */}
            <div className={`fixed inset-0 z-[100] transition-all duration-1000 ${mobileMenu ? "visible" : "invisible"}`}>
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-700 ${mobileMenu ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setMobileMenu(false)}
                />
                <div className={`absolute top-0 left-0 w-full max-w-sm h-full bg-white shadow-[30px_0_60px_rgba(0,0,0,0.1)] transition-transform duration-700 cubic-bezier(0.85, 0, 0.15, 1) ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className="p-10 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-xs font-black tracking-[0.3em] uppercase text-gray-400">Navigation</span>
                            <button onClick={() => setMobileMenu(false)} className="group p-2 ring-1 ring-gray-100 rounded-full hover:bg-black transition-all">
                                <X size={18} className="group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
                            </button>
                        </div>

                        <nav className="flex-1 space-y-1">
                            {categories.map((cat, i) => (
                                <Link
                                    key={cat}
                                    href={`/category/${formatSlug(cat)}`}
                                    onClick={() => setMobileMenu(false)}
                                    className="group flex items-center gap-4 py-4 border-b border-gray-50 hover:border-black transition-colors overflow-hidden"
                                >
                                    <span className="text-[9px] font-black text-gray-300 group-hover:text-red-600 transition-colors">0{i + 1}</span>
                                    <span className="text-xl font-bold uppercase tracking-tight transition-all duration-500 group-hover:translate-x-2">
                                        {cat}
                                    </span>
                                    <ChevronRight className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-red-600" size={16} />
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto pt-8 border-t border-gray-100">
                            <div className="bg-gray-50 p-6 rounded-[30px] flex items-center justify-between group cursor-pointer hover:bg-black transition-colors duration-500">
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-white/50 mb-1">Assistance</p>
                                    <p className="text-sm font-bold group-hover:text-white">+92 333 9844424</p>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                    <ArrowRight size={16} className="group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sophisticated Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[150] bg-white animate-in fade-in zoom-in duration-500">
                    <div className="max-w-7xl mx-auto px-6 h-full flex flex-col pt-20">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="group p-6 ring-1 ring-gray-100 rounded-full hover:bg-black transition-all"
                            >
                                <X size={32} strokeWidth={1} className="group-hover:text-white group-hover:rotate-90 transition-all duration-500" />
                            </button>
                        </div>

                        <div className="mt-10 md:mt-24 max-w-5xl">
                            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-600 mb-8 flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-red-600"></div> Elite Search
                            </p>
                            <input
                                type="text"
                                placeholder="Looking for something special?"
                                className="w-full text-4xl md:text-7xl font-black border-b-[1px] border-gray-200 focus:border-black outline-none pb-10 uppercase tracking-tighter placeholder:text-gray-100 transition-all"
                                autoFocus
                            />

                            <div className="mt-16">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Trending Collections</p>
                                <div className="flex flex-wrap gap-3">
                                    {["New Arrival", "Pure Silk", "Bridal Edit", "Cotton Luxe"].map(tag => (
                                        <button key={tag} className="px-8 py-4 border border-gray-100 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500">
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;