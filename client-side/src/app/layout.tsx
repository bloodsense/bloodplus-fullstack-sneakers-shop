import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { SITE_DESCRIPTION, SITE_NAME } from '../constants/seo-constants'
import { Providers } from '../providers/query-client-provider'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/providers/theme-provider'

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
		<html lang="ru" suppressHydrationWarning>
			<body className={`${montserrat.variable} antialiased`}>
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</Providers>
				<Toaster />
			</body>
		</html>
	)
}
