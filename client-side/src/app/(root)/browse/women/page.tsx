import type { Metadata } from 'next'
import { Women } from './Women'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Женские кроссовки',
}

export default function WomenPage() {
	return (
		<Suspense fallback={<p>Загрузка...</p>}>
			<Women />
		</Suspense>
	)
}
