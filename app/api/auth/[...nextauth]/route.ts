import NextAuth from 'next-auth/next'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { getMongoDb } from '@/lib/db/mongo'
import { IUserCredentialsRequest, IUserModel } from '@/models/users'
import { authenticate } from '@/repository/users'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials): Promise<IUserModel | null> {
				try {
					const { username, password } = credentials as IUserCredentialsRequest
					const db = await getMongoDb()
					const user = authenticate(db, username, password)
					return user
				} catch (error) {
					console.error(error as string)
					return null
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/',
	},
	callbacks: {
		async session({ session, token }: any) {
			session.accessToken = token.accessToken
			session.user = token.user
			return session
		},
		async jwt({ token, user }: any) {
			if (user) {
				token.accessToken = user.id
				token.user = user
			}
			return token
		},
	},
}

const handler = NextAuth(authOptions as AuthOptions)

export { handler as GET, handler as POST }
