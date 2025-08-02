import { ColorForm } from '@/components/admin/color-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редактировать цвет',
	...NO_INDEX_PAGE,
}

export default function EditColorPage({
	params,
}: {
	params: { slug: string }
}) {
	return (
		<AdminFormPageLayout title="Редактировать цвет">
			<ColorForm colorSlug={params.slug} />
		</AdminFormPageLayout>
	)
}
