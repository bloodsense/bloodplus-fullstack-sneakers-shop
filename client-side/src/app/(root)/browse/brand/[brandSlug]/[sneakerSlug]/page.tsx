import type { Metadata } from 'next'
import { Sneaker } from './sneakerSlug'

// TODO: Поменять title

export const metadata: Metadata = {
	title: 'Кроссовки по бренду',
}

export default function Page() {
	return <Sneaker />
}
