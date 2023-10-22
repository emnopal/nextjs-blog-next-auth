'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginHandler } from '@/services/users'

export default function LoginForm() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const router = useRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

        const loginRepsonse = await LoginHandler(username, password)

        switch (loginRepsonse) {
            case 'OK':
                router.replace('/')
                break
            default:
                setError(loginRepsonse)
                break
        }

	}

	return (
		<div className="grid place-items-center h-screen">
			<div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
				<h1 className="text-xl font-bold my-4">Login</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<input
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Username"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
						Login
					</button>
					{error && (
						<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
							{error}
						</div>
					)}

					<Link className="text-sm mt-3 text-right" href={'/register'}>
						Don&apos;t have an account? <span className="underline">Register</span>
					</Link>
				</form>
			</div>
		</div>
	)
}
