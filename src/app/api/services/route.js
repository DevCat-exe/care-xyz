import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
    try {
        const { db } = await connectToDatabase();

        const services = await db.collection('services').find({}).toArray();

        return Response.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        return Response.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}