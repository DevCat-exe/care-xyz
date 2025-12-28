import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
    try {
        const { name, nidNo, email, contact, password } = await req.json();

        if (!name || !nidNo || !email || !contact || !password) {
            return NextResponse.json(
                { message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Assignment Password Validation
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            return NextResponse.json(
                { message: 'Password must be 6+ chars with uppercase & lowercase' },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: 'User already exists with this email' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await db.collection('users').insertOne({
            name,
            nidNo,
            email,
            contact,
            password: hashedPassword,
            role: 'user',
            createdAt: new Date(),
        });

        return NextResponse.json(
            { message: 'User registered successfully', userId: newUser.insertedId },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration Error:', error);
        return NextResponse.json(
            { message: 'Something went wrong during registration' },
            { status: 500 }
        );
    }
}
