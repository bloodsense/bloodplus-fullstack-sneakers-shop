import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { SITE_DESCRIPTION, SITE_NAME } from '../constants/seo-constants'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const montserrat = Montserrat({
	variable: '--font-geist-sans',
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
	},

	description: SITE_DESCRIPTION,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="ru">
			<body className={`${montserrat.variable} antialiased`}>
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	)
}
