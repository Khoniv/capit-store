'use client'
import { assets } from "@/assets/assets";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddAddress = () => {
    const { getToken, router} = useAppContext()

    const [address, setAddress] = useState({
        fullName: '',
        phoneNumber: '',
        pincode: '',
        area: '',
        city: '',
        state: '',
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const token = await getToken()
            const {data} = await axios.post('/api/user/add-address',{address},{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                toast.success(data.message)
                router.push('cart')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
                <form onSubmit={onSubmitHandler} className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 sm:p-10 border border-black/[0.05] shadow-xs">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Shipping Information</span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1 mb-6">
                        Add New Address
                    </h1>

                    <div className="space-y-3.5">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Full Name</label>
                            <input
                                className="px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 w-full text-neutral-800 transition"
                                type="text"
                                placeholder="e.g. Budi Santoso"
                                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                                value={address.fullName}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Phone Number</label>
                            <input
                                className="px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 w-full text-neutral-800 transition"
                                type="text"
                                placeholder="08xxxxxxxxxx"
                                onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                                value={address.phoneNumber}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Postal Code</label>
                            <input
                                className="px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 w-full text-neutral-800 transition"
                                type="text"
                                placeholder="e.g. 53123"
                                onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                value={address.pincode}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Street & Area Address</label>
                            <textarea
                                className="px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 w-full text-neutral-800 resize-none transition"
                                rows={3}
                                placeholder="Jl. Anggrek No. 12, RT 02/05..."
                                onChange={(e) => setAddress({ ...address, area: e.target.value })}
                                value={address.area}
                                required
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">City / Town</label>
                                <input
                                    className="px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 w-full text-neutral-800 transition"
                                    type="text"
                                    placeholder="Purwokerto"
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    value={address.city}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">Province / State</label>
                                <input
                                    className="px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 w-full text-neutral-800 transition"
                                    type="text"
                                    placeholder="Jawa Tengah"
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                    value={address.state}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full hover:bg-neutral-800 transition shadow-sm"
                    >
                        Save Address
                    </button>
                </form>

                <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
                    <Image
                        className="w-64 h-auto opacity-80"
                        src={assets.my_location_image}
                        alt="location"
                    />
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-6">Accurate Delivery</p>
                    <p className="text-sm font-semibold text-neutral-700 mt-1">
                        Sandal pesanan Anda dikirim langsung dengan aman ke alamat terdaftar.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddAddress;