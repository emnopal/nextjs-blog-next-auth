'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterHandler } from '@/services/users'
import { IUserModel } from '@/models/users'
import { UserValidation } from '@/lib/validation/users'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

interface IRegisterOnSubmit {
	username: string
	password: string
	name: string
	email: string
}

export default function RegisterForm() {
	const validation = UserValidation.Register()
	const formOptions = { resolver: yupResolver(validation) }

	const { register, handleSubmit, formState } = useForm(formOptions)
	const { errors } = formState

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const router = useRouter()

	const submit = async (body: IRegisterOnSubmit) => {

        const registerResponse = await RegisterHandler(body as IUserModel)

        switch (registerResponse) {
            case 'OK':
				setSuccess('Registration successful')
                router.push('/login')
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
				<form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
					<input
						{...register('name')}
						type="text"
						placeholder="Name"
					/>
					{errors?.name && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.name?.message}</div>}
                    <input
						{...register('username')}
						type="text"
						placeholder="Username"
					/>
					{errors?.username && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.username?.message}</div>}
					<input
						{...register('email')}
						type="text"
						placeholder="Email"
					/>
					{errors?.email && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.email?.message}</div>}
					<input
						{...register('password')}
						type="password"
						placeholder="Password"
					/>
					{errors?.password && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{errors.password?.message}</div>}
					<button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
						Register
					</button>
					{error && (
						<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
							{error}
						</div>
					)}
					{success && (
						<div className="bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
							{success}
						</div>
					)}
					<Link className="text-sm mt-3 text-right" href={'/login'}>
						Already have an account? <span className="underline">Login</span>
					</Link>
				</form>
			</div>
		</div>
	)
}
