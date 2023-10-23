'use client'

import { IUserModel } from '@/models/users'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Nav() {
	const { data: session } = useSession()

	if (!session) return null

	const sessionUser = session?.user as IUserModel

	return (
		<nav className="bg-blue-500 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-white font-bold text-xl">
					Next Blog
				</Link>
				<div
					className="flex space-x-4 items-center mr-auto"
					style={{ paddingLeft: '25px' }}
				>
					<ul className="flex space-x-4">
						<li>
							<Link href="#" className="text-white">
								Users
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								About
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Services
							</Link>
						</li>
						<li>
							<Link href="#" className="text-white">
								Contact
							</Link>
						</li>
					</ul>
				</div>
				<div
					className="flex space-x-4 items-center ml-auto"
					style={{ paddingLeft: '25px' }}
				>
					<ul className="flex space-x-4">
						<li>
							<Link
								// href="/users/profile"
								href="/dashboard"
								className="text-white"
							>
								{`${sessionUser.name} (${sessionUser.username})`}
							</Link>
						</li>
						<li>
							<button onClick={() => signOut()} className="text-white">
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
