import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { db } = await connectToDatabase();

        // Ensure the booking belongs to the user
        const booking = await db.collection("bookings").findOne({
            _id: new ObjectId(id),
            userId: session.user.id,
        });

        if (!booking) {
            return Response.json({ error: "Booking not found" }, { status: 404 });
        }

        if (booking.status !== "Pending") {
            return Response.json(
                { error: "Only pending bookings can be cancelled" },
                { status: 400 }
            );
        }

        await db.collection("bookings").updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "Cancelled", updatedAt: new Date() } }
        );

        return Response.json({ success: true, message: "Booking cancelled" });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return Response.json({ error: "Failed to cancel booking" }, { status: 500 });
    }
}
