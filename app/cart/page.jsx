'use client'
import React from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const Cart = () => {

  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 px-4 sm:px-6 lg:px-8 pt-10 mb-20">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-black/[0.05] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Shopping Bag</span>
              <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
                Your Cart
              </h1>
            </div>
            <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold">
              {getCartCount()} Items
            </span>
          </div>
          <div className="overflow-x-auto bg-white rounded-[2rem] border border-black/[0.05] p-4 sm:p-6 shadow-xs">
            <table className="min-w-full table-auto">
              <thead className="text-left border-b border-black/[0.05]">
                <tr>
                  <th className="text-nowrap pb-4 px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Product Details
                  </th>
                  <th className="pb-4 px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Price
                  </th>
                  <th className="pb-4 px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Quantity
                  </th>
                  <th className="pb-4 px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find(product => product._id === itemId);

                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <tr key={itemId}>
                      <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                        <div>
                          <div className="w-16 h-16 rounded-2xl bg-[#FAF8F5] p-2 flex items-center justify-center border border-black/[0.04]">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="max-h-12 max-w-12 object-contain"
                              width={60}
                              height={60}
                            />
                          </div>
                          <button
                            className="md:hidden text-xs text-rose-500 font-semibold mt-1 hover:underline"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-xs hidden md:block">
                          <p className="font-bold text-neutral-900 text-sm">{product.name}</p>
                          <p className="text-[11px] text-neutral-400 capitalize">{product.category}</p>
                          <button
                            className="text-xs text-rose-500 font-semibold mt-1 hover:underline"
                            onClick={() => updateCartQuantity(product._id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-xs font-bold text-neutral-900">
                        Rp {product.offerPrice?.toLocaleString("id-ID")}
                      </td>
                      <td className="py-4 md:px-4 px-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                            className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-neutral-200 flex items-center justify-center font-bold text-neutral-700 hover:bg-neutral-200 transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-neutral-900">
                            {cartItems[itemId]}
                          </span>
                          <button
                            onClick={() => addToCart(product._id)}
                            className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-neutral-200 flex items-center justify-center font-bold text-neutral-700 hover:bg-neutral-200 transition"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 md:px-4 px-1 text-sm font-extrabold text-[#FF5A5F]">
                        Rp {(product.offerPrice * cartItems[itemId])?.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => router.push('/all-products')}
            className="group inline-flex items-center mt-6 gap-2 text-xs font-bold text-neutral-800 hover:text-black transition"
          >
            <span>←</span>
            <span>Continue Shopping</span>
          </button>
        </div>
        <OrderSummary />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
