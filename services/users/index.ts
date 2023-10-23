import { IUserModel } from '@/models/users'
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
		const res = await fetch('api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})

		if (res.ok) {
			return 'OK'
		} else if (res.status === 409) {
			return `User ${body.username} already registered.`
		} else {
			return 'User registration failed.'
		}

	} catch (error) {
		return error as string
	}
}

export async function Protected() {
	try {
		const res = await fetch('api', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return res.json()
	} catch (error) {
		return error as string
	}
}
