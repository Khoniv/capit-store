'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const categories = ["All", "Sandal Gunung", "Sandal heels", "Sandal jepit", "Sandal Platform", "Sandal Slide"];

const AllProducts = () => {
    const { products } = useAppContext();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        setSearchQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const filtered = products.filter(p => {
        const matchesCategory = selectedCategory === "All" || p.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesQuery = !searchQuery || p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Capit Store Catalog
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
                            All Sandal Collections
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs sm:text-sm text-neutral-500">
                                Showing {filtered.length} curated footwear styles
                            </p>
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-900 text-white">
                                    <span>&ldquo;{searchQuery}&rdquo;</span>
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="text-[10px] hover:text-rose-400"
                                        aria-label="Clear search"
                                    >
                                        ✕
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                    selectedCategory === cat
                                        ? "bg-neutral-950 text-white shadow-sm"
                                        : "bg-black/[0.04] text-neutral-700 hover:bg-black/[0.08]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filtered.map((product, index) => (
                        <ProductCard key={product._id || index} product={product} index={index} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AllProducts;
