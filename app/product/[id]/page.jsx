"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart } = useAppContext();

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const fetchProductData = async () => {
        const product = products.find((product) => product._id === id);
        setProductData(product);
    };

    useEffect(() => {
        fetchProductData();
    }, [id, products.length]);

    return productData ? (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="px-5 lg:px-16 xl:px-20">
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                            <Image
                                src={mainImage || productData.image[0]}
                                alt="alt"
                                className="w-full h-auto object-cover"
                                width={1280}
                                height={720}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                                >
                                    <Image
                                        src={image}
                                        alt="alt"
                                        className="w-full h-auto object-cover"
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full w-fit mb-2">
                            {productData.category}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 mb-3 tracking-tight">
                            {productData.name}
                        </h1>
                        <p className="text-sm text-neutral-600 leading-relaxed">{productData.description}</p>
                        
                        <div className="flex items-baseline gap-3 mt-6">
                            <span className="text-3xl font-extrabold text-[#FF5A5F]">
                                Rp {productData.offerPrice?.toLocaleString("id-ID")}
                            </span>
                            {productData.price > productData.offerPrice && (
                                <span className="text-base font-medium text-neutral-400 line-through">
                                    Rp {productData.price?.toLocaleString("id-ID")}
                                </span>
                            )}
                        </div>

                        <div className="my-6 border-t border-black/[0.06] pt-4">
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-4">
                                    <span className="w-20 font-bold uppercase text-neutral-400">Category</span>
                                    <span className="font-semibold text-neutral-800">{productData.category}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="w-20 font-bold uppercase text-neutral-400">Availability</span>
                                    <span className="font-semibold text-neutral-800">
                                        {productData.stock > 0 ? (
                                            <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
                                                {productData.stock} pcs in stock
                                            </span>
                                        ) : (
                                            <span className="text-rose-600 bg-rose-100 px-2 py-0.5 rounded-md font-bold">Stok Habis</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mt-6 gap-3">
                            <button
                                onClick={() => addToCart(productData._id)}
                                disabled={productData.stock === 0}
                                className={`flex-1 py-3.5 transition font-bold text-xs uppercase tracking-wider rounded-full shadow-xs
                                    ${productData.stock === 0
                                        ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                        : "bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900"
                                    }`}
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => {
                                    addToCart(productData._id);
                                    router.push("/cart");
                                }}
                                disabled={productData.stock === 0}
                                className={`flex-1 py-3.5 transition font-bold text-xs uppercase tracking-wider rounded-full shadow-sm
                                    ${productData.stock === 0
                                        ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                        : "bg-neutral-950 text-white hover:bg-neutral-800"
                                    }`}
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-20">
                    <div className="flex flex-col items-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Explore More</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                            Similar Sandals
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-14 w-full">
                        {products.slice(0, 4).map((product, index) => (
                            <ProductCard key={index} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    ) : (
        <Loading />
    );
};

export default Product;
