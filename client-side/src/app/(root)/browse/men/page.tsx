import type { Metadata } from 'next'
import { Men } from './Men'

export const metadata: Metadata = {
	title: 'Мужские кроссовки',
}

export default function Page() {
	return <Men />
}
