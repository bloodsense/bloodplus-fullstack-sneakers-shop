import { SizeForm } from '@/components/admin/size-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редактировать размер',
	...NO_INDEX_PAGE,
}

export default function EditSizePage({ params }: { params: { id: string } }) {
	return (
		<AdminFormPageLayout title="Редактировать размер">
			<SizeForm sizeId={params.id} />
		</AdminFormPageLayout>
	)
}
