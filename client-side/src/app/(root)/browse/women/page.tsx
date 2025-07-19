import type { Metadata } from 'next'
import { Women } from './Women'

export const metadata: Metadata = {
	title: 'Женские кроссовки',
}

export default function WomenPage() {
	return <Women />
}
