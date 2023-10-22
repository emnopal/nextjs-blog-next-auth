import { AuthOptions, getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import LoginForm from '@/components/Auth/Login'

export default async function Login() {
	const session = await getServerSession(authOptions as AuthOptions)

	if (session) redirect('/')

	return <LoginForm />
}
