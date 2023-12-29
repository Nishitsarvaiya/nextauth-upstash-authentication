import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
	try {
		const { name, email, password } = await req.json();
		const encryptedPassword = await bcrypt.hash(password, 20);
		const uid = nanoid();
		await db.set(`user:${uid}`, { name: name, email: email, id: uid, password: encryptedPassword });
		await db.set(`user:email:${email}`, uid);
		return NextResponse.json({ message: 'User registered.' }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: 'An error occurred while registering the user.' }, { status: 500 });
	}
}
