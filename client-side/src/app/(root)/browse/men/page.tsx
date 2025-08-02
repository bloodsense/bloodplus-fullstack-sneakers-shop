import type { Metadata } from 'next'
import { Men } from './Men'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Мужские кроссовки',
}

export default function Page() {
	return (
		<Suspense fallback={<p>Загрузка...</p>}>
			<Men />
		</Suspense>
	)
}
