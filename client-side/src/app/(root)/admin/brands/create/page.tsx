import { BrandForm } from '@/components/admin/brand-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Создать бренд',
	...NO_INDEX_PAGE,
}

export default function CreateBrandPage() {
	return (
		<AdminFormPageLayout title="Создать новый бренд">
			<BrandForm />
		</AdminFormPageLayout>
	)
}
