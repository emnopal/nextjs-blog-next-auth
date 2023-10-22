import { getMongoDb } from '@/lib/db/mongo'
import { IUserModel } from '@/models/users'
import { NextResponse } from 'next/server'
import { insert } from '@/repository/users'

export async function POST(req: Request) {
	try {
		const { username, name, email, password, role } =
			(await req.json()) as IUserModel

		const body = {
			username,
			name,
			email,
			password,
			role,
		}

		const db = await getMongoDb()
		const user = await insert(db, body)

		if (user) {
			const createdUser = user as IUserModel
			return NextResponse.json(
				{ message: `User ${createdUser.username} registered.` },
				{ status: 201 },
			)
		}

		return NextResponse.json(
			{ message: `User ${body.username} already registered.` },
			{ status: 409 },
		)
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred while registering the user.' },
			{ status: 500 },
		)
	}
}
