import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TopBar } from '@/components/top-bar'
import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div>
			<Header />
			<TopBar />
			{children}
			<Footer />
		</div>
	)
}
