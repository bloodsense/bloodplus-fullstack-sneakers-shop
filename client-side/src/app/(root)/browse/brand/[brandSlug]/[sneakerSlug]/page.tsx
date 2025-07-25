import type { Metadata } from 'next'
import { Sneaker } from './sneakerSlug'

export const metadata: Metadata = {
	title: 'Просмотр',
}

export default function Page() {
	return <Sneaker />
}
