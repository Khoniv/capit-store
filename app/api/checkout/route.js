import connDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// items: [{ productId: "...", quantity: 1 }]
// Mengurangi stok setiap produk yang di-checkout.
export async function POST(req) {
    try {
        await connDB();
        const { items } = await req.json();

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { success: false, message: "Tidak ada item untuk di-checkout" },
                { status: 400 }
            );
        }

        for (const item of items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }, // langsung kurangi stok
                { new: true }
            );
        }

        return NextResponse.json({ success: true, message: "Stok berhasil diperbarui" });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
