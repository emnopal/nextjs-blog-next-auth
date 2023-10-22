'use client'

import Link from 'next/link'

export default function Guest() {

	return (
		<div className="grid place-items-center h-screen">
			<div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
				<div>
					Please <Link href='/login'>Login</Link> to Continue
				</div>
			</div>
		</div>
	)
}
