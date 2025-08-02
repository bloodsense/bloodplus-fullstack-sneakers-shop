import type { Metadata } from 'next'
import { SeasonSlug } from './seasonSlug'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Сезонные кроссовки',
}

export default function Page() {
	return (
		<Suspense fallback={<p>Загрузка...</p>}>
			<SeasonSlug />
		</Suspense>
	)
}
