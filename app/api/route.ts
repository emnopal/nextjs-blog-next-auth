// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from 'next'
import { AuthOptions, getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './auth/[...nextauth]/route'

export async function GET(
	req: NextApiRequest
) {
    const session = await getServerSession(authOptions as AuthOptions)
    if (!session) {
        return NextResponse.json(
            { message: `Not logged in` },
            { status: 401 },
        )
    }
	return NextResponse.json(
        { message: `Foo` },
        { status: 200 },
    )
}
