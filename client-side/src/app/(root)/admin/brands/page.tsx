import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import Brands from './Brands'

export const metadata: Metadata = {
	title: 'Админ-панель | Бренды',
	...NO_INDEX_PAGE,
}

export default function BrandsPage() {
	return <Brands />
}
