import type { Metadata } from 'next'
import { SeasonSlug } from './seasonSlug'

export const metadata: Metadata = {
	title: 'Сезонные кроссовки',
}

export default function Page() {
	return <SeasonSlug />
}
