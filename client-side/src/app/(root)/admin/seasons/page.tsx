import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import Seasons from './Seasons'

export const metadata: Metadata = {
	title: 'Админ-панель | Сезоны',
	...NO_INDEX_PAGE,
}

export default function SeasonsPage() {
	return <Seasons />
}
