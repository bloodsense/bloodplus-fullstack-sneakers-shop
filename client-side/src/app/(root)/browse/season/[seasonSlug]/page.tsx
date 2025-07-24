import type { Metadata } from 'next'
import { SeasonSlug } from './seasonSlug'

// TODO: Поменять title

export const metadata: Metadata = {
	title: 'Кроссовки по сезону',
}

export default function Page() {
	return <SeasonSlug />
}
