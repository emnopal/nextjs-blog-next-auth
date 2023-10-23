import { AuthOptions, getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Authenticate from '@/components/Home/Authenticated'
import Guest from '@/components/Home/Guest'


export default async function Home() {
	const session = await getServerSession(authOptions as AuthOptions)

	let SessionTemplate = (
		<>
			<Guest/>
		</>
	)

	if (session) {
		SessionTemplate = (
			<>
				<Authenticate/>
			</>
		)
	}

	return (
		<main>
			{SessionTemplate}
		</main>
	)
}
