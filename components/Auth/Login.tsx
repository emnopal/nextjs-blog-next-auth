'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginHandler } from '@/services/users'
import { UserValidation } from '@/lib/validation/users'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

interface ILoginOnSubmit {
	username: string
	password: string
}

export default function LoginForm() {
	const validation = UserValidation.Login()
	const formOptions = { resolver: yupResolver(validation) }

	const { register, handleSubmit, formState } = useForm(formOptions)
	const { errors } = formState

	const [error, setError] = useState('')

	const router = useRouter()

	const submit = async ({ username, password }: ILoginOnSubmit) => {
		const loginRepsonse = await LoginHandler(username, password)

		switch (loginRepsonse) {
			case 'OK':
				router.refresh()
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
				<form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
					<input {...register('username')} type="text" placeholder="Username" />
					{errors?.username ? <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username?.message}</div> : null}
					<input
						{...register('password')}
						type="password"
						placeholder="Password"
					/>
					{errors?.password ? <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password?.message}</div> : null}
					<button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
						Login
					</button>
					{error && (
						<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
							{error}
						</div>
					)}
					<Link className="text-sm mt-3 text-right" href={'/register'}>
						Don&apos;t have an account?{' '}
						<span className="underline">Register</span>
					</Link>
				</form>
			</div>
		</div>
	)
}
