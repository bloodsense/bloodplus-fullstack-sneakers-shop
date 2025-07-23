import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TopBar } from '@/components/top-bar'
import { ButtonToggleTheme } from '@/components/ui/button-toggle-theme'
import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<TopBar />
			<main className="flex-grow">{children}</main>
			<ButtonToggleTheme className="fixed bottom-5 left-5 z-50" />
			<Footer />
		</div>
	)
}
