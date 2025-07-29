import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import Sizes from './Sizes'

export const metadata: Metadata = {
	title: 'Админ-панель | Размеры',
	...NO_INDEX_PAGE,
}

export default function SizesPage() {
	return <Sizes />
}
