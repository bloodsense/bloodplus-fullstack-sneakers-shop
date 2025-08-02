import type { Metadata } from 'next'
import { Home } from './Home'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Главная',
}

export default function HomePage() {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Home />
		</Suspense>
	)
}
