'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterHandler } from '@/services/users'
import { IUserModel } from '@/models/users'

export default function RegisterForm() {
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const router = useRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!name || !username || !email || !password) {
			setError('All fields are necessary.')
			return
		}

        const body = {name, username, email, password}
        const registerResponse = await RegisterHandler(body as IUserModel)

        switch (registerResponse) {
            case 'OK':
                const form = e.target as HTMLFormElement
                form.reset()
                router.push('/')
                break
            default:
                setError(registerResponse)
                break
        }
	}

	return (
		<div className="grid place-items-center h-screen">
			<div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
				<h1 className="text-xl font-bold my-4">Register</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<input
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Full Name"
					/>
                    <input
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="Username"
					/>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						placeholder="Email"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
						Register
					</button>

					{error && (
						<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
							{error}
						</div>
					)}

					<Link className="text-sm mt-3 text-right" href={'/'}>
						Already have an account? <span className="underline">Login</span>
					</Link>
				</form>
			</div>
		</div>
	)
}
