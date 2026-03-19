"use client";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/app/context/CartContext";
import Navbar from "@/Components/Header/page";
import Footer from "@/Components/Footer/page";
import CartDrawer from "@/Components/CartDrawer";
import "./globals.css"; // Ensure standard Tailwind imports here

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className="bg-[#FDFDFD] text-black antialiased">
        <CartProvider>
          {/* Agar Admin page nahi hai, tabhi Navbar aur Footer dikhao */}
          {!isAdmin && <Navbar />}

          <main className={`${!isAdmin ? "pt-28" : ""} min-h-screen`}>
            {children}
          </main>

          {!isAdmin && (
            <>
              <CartDrawer />
              <Footer />
            </>
          )}
        </CartProvider>
      </body>
    </html>
  );
}