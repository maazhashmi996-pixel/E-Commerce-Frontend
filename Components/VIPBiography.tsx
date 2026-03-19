"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Sparkles } from 'lucide-react';

const VIPBiography = () => {
    return (
        <section className="relative min-h-[80vh] bg-white flex items-center overflow-hidden py-20 px-6">
            {/* Subtle Light Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-red-50 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[300px] h-[300px] bg-gray-50 blur-[80px] rounded-full"></div>
            </div>

            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20 relative z-10">

                {/* Left Side: VIP Logo Branding */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: -30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative flex justify-center lg:justify-start"
                >
                    <div className="relative group">
                        {/* Thin Minimal Outer Ring */}
                        <div className="absolute inset-[-15px] border border-black/[0.03] rounded-full animate-spin-slow group-hover:border-red-100 transition-colors duration-700"></div>

                        <div className="w-56 h-56 md:w-72 md:h-72 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
                            {/* Logo Text */}
                            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-black select-none">
                                D<span className="text-red-600">.</span>
                            </h2>
                            {/* Soft Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/[0.02] to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: VIP Content (Compact Text) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-2 text-red-600">
                        <Diamond size={14} className="animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Established 2026</span>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-black text-black uppercase leading-[1.1] tracking-tighter italic">
                        The Essence of <br />
                        <span className="text-gray-300">Modern Couture</span>
                    </h3>

                    <div className="space-y-5">
                        <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed max-w-md">
                            D.Design redefines luxury through minimal aesthetics and superior craftsmanship.
                            We believe that true elegance lies in the details that often go unnoticed,
                            creating a legacy of style that transcends seasons.
                        </p>

                        <p className="text-gray-400 text-[10px] md:text-xs italic leading-relaxed max-w-sm border-l border-red-200 pl-4">
                            "Crafting a visual language for those who speak the silent tongue of luxury."
                        </p>
                    </div>

                    {/* Compact Stats */}
                    <div className="pt-6 flex gap-10 border-t border-gray-100">
                        <div className="space-y-1">
                            <h4 className="text-lg font-black text-black italic">100%</h4>
                            <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">Pure Quality</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-black text-black italic">Handmade</h4>
                            <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">Artisan Built</p>
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-lg font-black text-black italic">Bespoke</h4>
                            <p className="text-[7px] font-black uppercase tracking-widest text-gray-400">Limited Run</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default VIPBiography;