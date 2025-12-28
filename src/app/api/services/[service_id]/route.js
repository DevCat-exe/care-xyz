import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { service_id } = await params;
        const { db } = await connectToDatabase();

        const service = await db.collection("services").findOne({ _id: service_id });

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
    }
}
