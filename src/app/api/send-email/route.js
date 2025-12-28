import { sendBookingEmail } from "@/lib/email";

export async function POST(req) {
    const body = await req.json();
    await sendBookingEmail(body);
    return Response.json({ sent: true });
}