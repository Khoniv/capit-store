"use client"
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                reply_to: formData.email
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                // success logic
            })
            .catch((error) => {
                // error handling
            });

    };


    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
                <div className="text-center mb-12">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Get In Touch</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mt-1">
                        Contact Us
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                        Punya pertanyaan seputar ukuran, bahan sandal, atau pemesanan custom? Kami siap membantu.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.05] shadow-xs">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. John Doe"
                                className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="name@example.com"
                                className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Write your message here..."
                                className="w-full px-4 py-2.5 text-xs bg-[#FAF8F5] border border-neutral-200 rounded-xl outline-none focus:border-neutral-900 transition resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-neutral-950 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full hover:bg-neutral-800 transition shadow-sm"
                        >
                            Send Message
                        </button>
                        {submitted && <p className="text-emerald-600 text-xs font-semibold mt-2">Terima kasih, pesan Anda telah terkirim!</p>}
                    </form>

                    <div className="flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 rounded-2xl bg-orange-50 text-orange-600">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Workshop & Studio</h3>
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">
                                        Universitas Amikom Purwokerto, Jl. Letjend Pol. Soemarto No.126, Watumas
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Email</h3>
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">hello@capitstore.id</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">WhatsApp Hotline</h3>
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 mt-0.5">+62 812-3456-7890</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-black/[0.05]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63318.50335656835!2d109.20171703250966!3d-7.426621297351276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65416ee4eb1f5d%3A0x70d56f6a963ec202!2sUniversitas%20Amikom%20Purwokerto!5e0!3m2!1sen!2sid!4v1715889140595!5m2!1sen!2sid"
                                width="100%"
                                height="180"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;