import type { Metadata } from 'next'
import { SneakerSlug } from './sneakerSlug'

export const metadata: Metadata = {
	title: 'Просмотр',
}

export default function Page() {
	return <SneakerSlug />
}
