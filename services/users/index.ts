import { IUserModel } from '@/models/users'
import axios from 'axios'
import { signIn } from 'next-auth/react'

export async function LoginHandler(
	username: string,
	password: string,
	redirect: boolean = false,
): Promise<string> {
	try {
		const res = await signIn('credentials', {
			username,
			password,
			redirect,
		})

		if (res?.error) {
			return 'Invalid Credentials'
		}

		return 'OK'
	} catch (error) {
		return error as string
	}
}

export async function RegisterHandler(body: IUserModel) {
	try {

		body.role = 1

		const res = await axios.post(
			'api/auth/register', JSON.stringify(body),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)

		switch(res.status) {
			case 200:
			case 201:
				return 'OK'
			case 409:
				return `User ${body.username} already registered.`
			default:
				return 'User registration failed.'
		}

	} catch (error) {
		return error as string
	}
}

export async function Protected() {
	try {

		const res = await axios.get(
			'api',
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)

		return res.data

	} catch (error) {
		return error as string
	}
}
