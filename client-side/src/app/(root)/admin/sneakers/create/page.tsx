import { SneakerForm } from '@/components/admin/sneaker-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Создать кроссовки',
	...NO_INDEX_PAGE,
}

export default function CreateSneakerPage() {
	return (
		<AdminFormPageLayout title="Создать новые кроссовки">
			<SneakerForm />
		</AdminFormPageLayout>
	)
}
