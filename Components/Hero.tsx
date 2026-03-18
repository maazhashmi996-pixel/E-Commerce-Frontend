"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const slides = [
    {
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1372",
        title: "WINTER COLLECTION 2026",
        subtitle: "LUXURY EMBROIDERY & COMFORT",
    },
    {
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470",
        title: "EID SPECIAL EDITION",
        subtitle: "TIMELESS ELEGANCE FOR YOUR SPECIAL DAY",
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    return (
        <div className="relative h-[90vh] w-full overflow-hidden bg-gray-100">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                >
                    <img src={slide.image} className="w-full h-full object-cover" alt="hero" />
                    <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white">
                        <p className="text-xs font-bold tracking-[0.5em] mb-4 animate-bounce">{slide.subtitle}</p>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">{slide.title}</h1>
                        <button className="px-10 py-4 bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-500 rounded-full">
                            SHOP COLLECTION
                        </button>
                    </div>
                </div>
            ))}

            {/* Navigation */}
            <div className="absolute bottom-10 right-10 flex gap-4">
                <button onClick={() => setCurrent(prev => (prev === 0 ? slides.length - 1 : prev - 1))} className="p-3 border border-white/50 rounded-full text-white hover:bg-white hover:text-black transition">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={() => setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1))} className="p-3 border border-white/50 rounded-full text-white hover:bg-white hover:text-black transition">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Hero;