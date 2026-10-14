import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <section className="py-10 md:py-14">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Handcrafted Selection
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-0.5">
            Popular Sandals
          </h2>
        </div>

        <button
          onClick={() => router.push("/all-products")}
          className="group flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-orange-600 transition"
        >
          <span>View All</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>

      {/* Grid of Rounded Pastel Cards (matching reference) */}
      {products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="w-full aspect-square rounded-[2rem] bg-neutral-200/70" />
              <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
              <div className="h-4 bg-neutral-200 rounded-md w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product._id || index} product={product} index={index} />
          ))}
        </div>
      )}

      {/* Discover more footer button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/all-products")}
          className="px-8 py-3 rounded-full bg-black/[0.04] hover:bg-neutral-900 hover:text-white text-xs font-bold text-neutral-800 transition duration-200"
        >
          Explore All Categories ({products.length} Items)
        </button>
      </div>
    </section>
  );
};

export default HomeProducts;
