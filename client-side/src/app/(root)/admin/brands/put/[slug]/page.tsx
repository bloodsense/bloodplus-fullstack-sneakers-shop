import { BrandForm } from '@/components/admin/brand-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редактировать бренд',
	...NO_INDEX_PAGE,
}

const EditBrandPage = ({ params }: { params: { slug: string } }) => {
	const { slug } = params

	return (
		<AdminFormPageLayout title="Редактировать бренд">
			<BrandForm brandSlug={slug} />
		</AdminFormPageLayout>
	)
}

export default EditBrandPage
