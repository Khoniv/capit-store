"use client";
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isSeller, router, cartItems } = useAppContext();

  const totalCartCount = cartItems
    ? Object.values(cartItems).reduce((sum, qty) => sum + (qty || 0), 0)
    : 0;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          
          {/* Left: Menu Slider Trigger & Search Input */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/[0.04] hover:bg-neutral-900 hover:text-white text-xs font-semibold tracking-wide text-neutral-800 transition duration-200 cursor-pointer shadow-2xs"
            >
              <span className="text-sm leading-none">☰</span>
              <span className="hidden xs:inline">Menu</span>
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("search");
                const query = input?.value?.trim() || "";
                if (query) {
                  router.push(`/all-products?q=${encodeURIComponent(query)}`);
                } else {
                  router.push("/all-products");
                }
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/[0.04] focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-900 transition w-28 xs:w-36 sm:w-52 md:w-64"
            >
              <svg
                className="w-3.5 h-3.5 text-neutral-500 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                name="search"
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-xs text-neutral-800 placeholder-neutral-400 outline-none"
              />
            </form>
          </div>

          {/* Center: Brand Logo (Only capitstore, without studio) */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer select-none group px-1"
          >
            <span className="text-lg xs:text-xl sm:text-2xl font-black tracking-tight text-neutral-950 font-sans group-hover:opacity-80 transition">
              capitstore
            </span>
          </div>

          {/* Right: Actions (Wishlist, Cart, Account, Seller) */}
          <div className="flex items-center gap-2 sm:gap-3">
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="hidden lg:inline-flex items-center gap-1 text-[11px] font-semibold bg-neutral-900 text-white px-3.5 py-1.5 rounded-full hover:bg-neutral-800 transition shadow-sm"
            >
              <span>Seller Hub</span>
            </button>
          )}

          {/* Quick links on desktop */}
          <Link
            href="/all-products"
            className="hidden md:inline text-xs font-medium text-neutral-600 hover:text-neutral-950 transition px-2"
          >
            Catalog
          </Link>

          {/* Cart Icon with coral pill counter matching reference */}
          <button
            onClick={() => router.push("/cart")}
            className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] transition text-neutral-800"
            aria-label="Cart"
          >
            <svg
              className="w-4 h-4 text-neutral-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="min-w-4 h-4 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-[#FF5A5F] rounded-full">
              {totalCartCount}
            </span>
          </button>

          {/* Auth button */}
          {user ? (
            <div className="flex items-center ml-1">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-full ring-2 ring-orange-200",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="All Products"
                    labelIcon={<BoxIcon />}
                    onClick={() => router.push("/all-products")}
                  />
                  <UserButton.Action
                    label="My Cart"
                    labelIcon={<CartIcon />}
                    onClick={() => router.push("/cart")}
                  />
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<BagIcon />}
                    onClick={() => router.push("/my-orders")}
                  />
                  {isSeller && (
                    <UserButton.Action
                      label="Seller Dashboard"
                      labelIcon={<span className="text-xs">⚡</span>}
                      onClick={() => router.push("/seller")}
                    />
                  )}
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-sm"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>

    {/* Sliding Menu Drawer */}
    {menuOpen && (
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity duration-300"
        />

        {/* Drawer Panel */}
        <div className="relative w-full max-w-xs bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 z-10 animate-in slide-in-from-left duration-300">
          <div>
            {/* Header with Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.06]">
              <span className="text-xl font-black tracking-tight text-neutral-950">
                capitstore
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-black/[0.05] hover:bg-black/[0.1] flex items-center justify-center text-neutral-700 transition"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-8 flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-bold text-neutral-900 hover:bg-black/[0.04] transition group"
              >
                <span>Home</span>
                <span className="text-xs text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/all-products"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-bold text-neutral-900 hover:bg-black/[0.04] transition group"
              >
                <span>All Collections</span>
                <span className="text-xs text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/about-us"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-bold text-neutral-900 hover:bg-black/[0.04] transition group"
              >
                <span>About Ndaweg Studio</span>
                <span className="text-xs text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl text-base font-bold text-neutral-900 hover:bg-black/[0.04] transition group"
              >
                <span>Help & Contact</span>
                <span className="text-xs text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              {isSeller && (
                <div className="pt-4 mt-2 border-t border-black/[0.05]">
                  <Link
                    href="/seller"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition"
                  >
                    <span>⚡ Seller Dashboard</span>
                  </Link>
                </div>
              )}
            </nav>
          </div>

          {/* Drawer Footer */}
          <div className="pt-6 border-t border-black/[0.06] text-xs text-neutral-500 space-y-1">
            <p className="font-semibold text-neutral-800">Capit Store Indonesia</p>
            <p>Comfort meets authentic sandal craftsmanship</p>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Navbar;
