'use client'

import { IUserModel } from '@/models/users'
import { Protected } from '@/services/users'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function UserInfo() {
	const { data: session } = useSession()

	const [protect, setProtect] = useState('')

	const sessionUser = session?.user as IUserModel

	(async () => {
		await Protected().then(x => setProtect(x.message))
	})()

	return (
		<div className="grid place-items-center h-screen">
			<div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
				<div>
					Name: <span className="font-bold">{sessionUser?.name}</span>
				</div>
				<div>
					Username: <span className="font-bold">{sessionUser?.username}</span>
				</div>
                <div>
					Email: <span className="font-bold">{sessionUser?.email}</span>
				</div>
				<div>
					Password: <span className="font-bold">{sessionUser?.password}</span>
				</div>
				<div>
					Protected Content: <span className="font-bold">{protect}</span>
				</div>
			</div>
		</div>
	)
}
