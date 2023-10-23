import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from './Provider'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<AuthProvider>
					<Nav/>
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
