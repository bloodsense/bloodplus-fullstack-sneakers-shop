import type { Metadata } from 'next'
import { Home } from './home'

export const metadata: Metadata = {
	title: 'Главная',
}

export default function HomePage() {
	return <Home />
}
