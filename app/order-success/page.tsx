"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";
import confetti from 'canvas-confetti'; // npm install canvas-confetti

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    // URL se real tracking code uthayenge
    const orderID = searchParams.get("id") || "DD-PROCESSING";
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);

        // --- VIP Confetti Effect ---
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#000000', '#ef4444', '#ffffff']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#000000', '#ef4444', '#ffffff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    return (
        <div className={`max-w-2xl w-full text-center space-y-10 transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

            {/* --- Hero Section --- */}
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping scale-150 opacity-20" />
                <div className="relative bg-black text-white p-8 rounded-full inline-block shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                    <CheckCircle size={60} className="text-green-400" />
                </div>
            </div>

            <div className="space-y-4">
                <h1 className="text-5xl font-black uppercase tracking-tighter text-black italic leading-none">
                    It's Official!
                </h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[11px] max-w-md mx-auto leading-relaxed">
                    Thank you for choosing <span className="text-black">D.Design</span>. Your luxury parcel is now in our queue.
                </p>
            </div>

            {/* --- Order Info Card (VIP Style) --- */}
            <div className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] text-left relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                    <ShieldCheck size={150} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex items-center gap-6">
                        <div className="p-5 bg-gray-50 rounded-3xl text-black shadow-inner">
                            <Package size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Tracking Reference</p>
                            <p className="text-2xl font-black text-black tracking-tighter select-all">{orderID}</p>
                        </div>
                    </div>

                    <div className="space-y-2 w-full md:w-auto">
                        <div className="flex items-center justify-between md:justify-end gap-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-4 py-2 rounded-full border border-green-100">Confirmed</span>
                        </div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-right">Payment: Cash on Delivery</p>
                    </div>
                </div>
            </div>

            {/* --- Shipping Estimate Mini-Timeline --- */}
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
                    <div className="h-1 bg-black rounded-full" />
                    <div className="h-1 bg-gray-100 rounded-full" />
                    <div className="h-1 bg-gray-100 rounded-full" />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimated Delivery: 3-5 Working Days</p>
            </div>

            {/* --- Action Buttons --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link
                    href="/"
                    className="group w-full sm:w-auto px-10 py-5 border-2 border-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
                >
                    <Home size={16} /> Continue Shopping
                </Link>
                <Link
                    href={`/track-order?id=${orderID}`}
                    className="group w-full sm:w-auto px-10 py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all"
                >
                    Live Tracking <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Footer Note */}
            <div className="pt-10 border-t border-gray-100">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.4em] leading-loose">
                    Need Help? WhatsApp us at <span className="text-black">+923339844424</span> <br />
                    Please keep your Order ID safe for future reference.
                </p>
            </div>
        </div>
    );
}

// Main component with Suspense Boundary for useSearchParams()
export default function OrderSuccess() {
    return (
        <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 py-20">
            <Suspense fallback={
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verifying Order...</p>
                </div>
            }>
                <OrderSuccessContent />
            </Suspense>
        </div>
    );
}