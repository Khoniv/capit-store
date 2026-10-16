"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { Users, Target, Lightbulb } from "lucide-react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Our Story</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
                        About Capit Store
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                        Mengenal lebih dekat visi, misi, dan keahlian di balik kreasi sandal berkualitas kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.05] shadow-xs">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-700">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-neutral-900">Our Vision</h3>
                                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                                    Menjadi pelopor alas kaki kasual Indonesia yang menggabungkan estetika modern dengan ketahanan dan kenyamanan tanpa kompromi.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-neutral-900">Our Mission</h3>
                                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                                    Menghadirkan berbagai pilihan sandal kontemporer terbaik dengan harga terjangkau dan pelayanan terpercaya bagi semua kalangan.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-700">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-neutral-900">Ndaweg Studio</h3>
                                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                                    Kolektif desainer dan pengrajin lokal yang berdedikasi menciptakan setiap detail sandal dengan sentuhan seni khas.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="rounded-[2rem] bg-[#FAF8F5] p-6 border border-black/[0.04] flex items-center justify-center">
                            <Image
                                src={assets.logo}
                                alt="Company Logo"
                                width={2000}
                                height={220}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
