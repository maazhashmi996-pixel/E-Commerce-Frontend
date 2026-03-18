import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand Bio */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-black tracking-tighter">D.DESIGN<span className="text-red-600">.</span></h2>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        Premium fabric store specializing in Pure Raw Silk and Kurrendi Staff.
                        We bring luxury dresses to your doorstep with "Outclass" quality.
                    </p>
                    <div className="flex gap-4">
                        <Instagram className="cursor-pointer hover:text-red-500 transition" size={20} />
                        <Facebook className="cursor-pointer hover:text-blue-600 transition" size={20} />
                    </div>
                </div>

                {/* Categories Quick Links */}
                <div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-6">Our Fabrics</h4>
                    <ul className="space-y-3 text-sm text-gray-500 font-bold uppercase text-[11px]">
                        <li className="hover:text-black cursor-pointer">Kurrendi Staff</li>
                        <li className="hover:text-black cursor-pointer">Pure Raw Silk</li>
                        <li className="hover:text-black cursor-pointer">Korean Raw Silk</li>
                        <li className="hover:text-black cursor-pointer">Pure Cotton</li>
                    </ul>
                </div>

                {/* Help & Support */}
                <div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-6">Customer Care</h4>
                    <ul className="space-y-3 text-sm text-gray-500 font-bold uppercase text-[11px]">
                        <li><Link href="/track">Track Your Order</Link></li>
                        <li>Shipping Policy</li>
                        <li>Returns & Exchanges</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-black uppercase text-xs tracking-widest mb-6">Get In Touch</h4>
                    <ul className="space-y-4 text-[11px] font-bold text-gray-600 uppercase">
                        <li className="flex items-center gap-3"><Phone size={14} /> +923339844424</li>
                        <li className="flex items-center gap-3"><Mail size={14} /> support@ddesign.com</li>
                        <li className="flex items-start gap-3"><MapPin size={14} className="mt-1" /> Lahore, Punjab, Pakistan</li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-[1400px] mx-auto border-t border-gray-50 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-400 tracking-widest">
                <p>© 2026 D.DESIGN PREMIUM. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-6 mt-4 md:mt-0 uppercase">
                    <span>Payment Methods: JazzCash / COD</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;