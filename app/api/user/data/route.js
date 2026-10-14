import connDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        await connDB()
        let user = await User.findById(userId)
        if (!user){
            // Auto sync: ambil info user dari Clerk jika webhook inngest belum jalan
            try {
                const { clerkClient } = await import("@clerk/nextjs/server");
                const client = await clerkClient();
                const clerkUser = await client.users.getUser(userId);
                if (clerkUser) {
                    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
                    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || email.split("@")[0] || "User";
                    const imageUrl = clerkUser.imageUrl || "";
                    user = await User.create({
                        _id: userId,
                        name,
                        email,
                        imageUrl,
                        cartItems: {}
                    });
                }
            } catch (syncErr) {
                console.error("Auto sync error:", syncErr);
            }
        }
        if (!user) {
            return NextResponse.json({success: false, message: "User Not Found"})
        }
        return NextResponse.json({success:true, user})
    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}