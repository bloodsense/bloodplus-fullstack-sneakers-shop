import type { Metadata } from 'next'
import { BrandSlug } from './brandSlug'

export const metadata: Metadata = {
	title: 'Брендовые кроссовки',
}

export default function Page() {
	return <BrandSlug />
}
