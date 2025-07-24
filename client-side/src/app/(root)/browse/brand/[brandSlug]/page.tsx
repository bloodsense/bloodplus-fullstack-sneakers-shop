import type { Metadata } from 'next'
import { BrandSlug } from './brandSlug'

// TODO: Поменять title

export const metadata: Metadata = {
	title: 'Кроссовки по бренду',
}

export default function Page() {
	return <BrandSlug />
}
