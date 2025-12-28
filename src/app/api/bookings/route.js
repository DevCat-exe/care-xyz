import { connectToDatabase } from '../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import { sendBookingEmail } from '../../../lib/email';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { serviceId, duration, location, address, totalCost, bookingDate, bookingTime } = await request.json();

        const { db } = await connectToDatabase();

        // Get service details
        const service = await db.collection('services').findOne({ _id: serviceId });

        if (!service) {
            return Response.json({ error: 'Service not found' }, { status: 404 });
        }

        const booking = {
            userId: session.user.id,
            serviceId,
            serviceName: service.name,
            duration,
            location,
            address,
            totalCost,
            bookingDate,
            bookingTime,
            status: 'Pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('bookings').insertOne(booking);

        // Send confirmation email
        try {
            await sendBookingEmail({
                to: session.user.email,
                subject: 'Booking Confirmation - Care.xyz',
                bookingDetails: {
                    userName: session.user.name,
                    serviceName: service.name,
                    duration,
                    location,
                    address,
                    totalCost,
                    bookingDate,
                    bookingTime,
                    status: 'Pending',
                },
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        return Response.json({
            success: true,
            bookingId: result.insertedId,
            booking: { ...booking, _id: result.insertedId }
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        return Response.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { db } = await connectToDatabase();

        const bookings = await db.collection('bookings')
            .find({ userId: session.user.id })
            .sort({ createdAt: -1 })
            .toArray();

        return Response.json(bookings);

    } catch (error) {
        console.error('Error fetching bookings:', error);
        return Response.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}