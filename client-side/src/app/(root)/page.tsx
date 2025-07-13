import type { Metadata } from 'next'
import Home from '../page'

export const metadata: Metadata = {
	title: 'Главная',
}

export default function HomePage() {
	return <Home />
}
