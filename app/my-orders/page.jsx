'use client';
import React, { useEffect, useState } from "react";
import { assets, orderDummyData } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {

    const { currency, getToken, user } = useAppContext();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken()
            const {data} = await axios.get('/api/order/list',{headers:{Authorization:`Bearer ${token}`}})
            if (data.success) {
                setOrders(data.orders.reverse())
                setLoading(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (user){
            fetchOrders();
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
                <div className="mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Account History</span>
                    <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
                        My Orders
                    </h1>
                </div>

                {loading ? <Loading /> : (
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <div className="bg-white rounded-[2rem] p-12 text-center border border-black/[0.05] shadow-xs">
                                <p className="text-sm font-semibold text-neutral-600">You haven&apos;t placed any orders yet.</p>
                            </div>
                        ) : (
                            orders.map((order, index) => (
                                <div key={index} className="bg-white rounded-[2rem] p-6 border border-black/[0.05] shadow-xs flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] p-3 flex items-center justify-center shrink-0 border border-black/[0.04]">
                                            <Image
                                                className="w-8 h-8 object-contain"
                                                src={assets.box_icon}
                                                alt="box_icon"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-neutral-900 text-sm">
                                                {order.items.map((item) => item.product.name + ` x ${item.quantity}`).join(", ")}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                {order.items.length} item(s) • {new Date(order.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-xs text-neutral-600 space-y-0.5">
                                        <p className="font-bold text-neutral-800">{order.address.fullName}</p>
                                        <p>{order.address.area}, {order.address.city}</p>
                                        <p>{order.address.phoneNumber}</p>
                                    </div>

                                    <div className="text-left md:text-right">
                                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 tracking-wider">
                                            COD
                                        </span>
                                        <p className="text-base font-extrabold text-[#FF5A5F] mt-1">
                                            {currency}{order.amount?.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyOrders;