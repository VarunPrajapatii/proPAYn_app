"use server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";
import { cookies } from "next/headers";

export async function createOnRampTransaction(amount: number, provider: string) {
    const cookieHeader = cookies().toString();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { message: "User not logged in." }
    }

    try {
        // console.log("Creating OnRamp Transaction for amount:", amount, "provider:", provider);
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/v1/onRamp/initiate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Cookie': cookieHeader },
            body: JSON.stringify({ amount, provider })
        });

        const data = await response.json();

        // console.log("OnRamp Transaction Response:", data);
        
        if (data?.redirectUrl) {
            return data.redirectUrl;
        }
        
        return { message: data.message || "Failed to initiate payment" };
    } catch (error) {
        return { message: "Network error occurred" };
    }
}