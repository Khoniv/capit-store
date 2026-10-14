import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-black/[0.05] bg-white text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-neutral-900">
                CAPIT STORE
              </span>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                STUDIO
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
              Curated artisanal sandal collections designed for all-day comfort, outdoor adventures, and effortless streetwear style.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
              Explore
            </h3>
            <ul className="text-xs sm:text-sm space-y-2.5">
              <li>
                <a href="/" className="hover:text-black transition">Home</a>
              </li>
              <li>
                <a href="/all-products" className="hover:text-black transition">All Collections</a>
              </li>
              <li>
                <a href="/about-us" className="hover:text-black transition">About Studio</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-black transition">Help & Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
              Contact
            </h3>
            <div className="text-xs sm:text-sm space-y-2.5 text-neutral-500">
              <p>WhatsApp: +62 812-3456-7890</p>
              <p>Email: hello@capitstore.id</p>
              <p>Yogyakarta, Indonesia</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-3">
          <p>© {new Date().getFullYear()} Capit Store Studio. All rights reserved.</p>
          <p>Handcrafted with comfort in mind</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;