import RegisterForm from '@/components/Auth/Register'
import { AuthOptions, getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Register() {
	const session = await getServerSession(authOptions as AuthOptions)

	if (session) redirect('/')

	return <RegisterForm />
}
