import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TopBar } from '@/components/top-bar'
import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<TopBar />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	)
}
