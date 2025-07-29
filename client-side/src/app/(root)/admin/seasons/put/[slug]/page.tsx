import { SeasonForm } from '@/components/admin/season-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редактировать сезон',
	...NO_INDEX_PAGE,
}

interface IEditPageProps {
	params: { slug: string }
}

export default function EditSeasonPage({ params }: IEditPageProps) {
	return (
		<AdminFormPageLayout title="Редактировать сезон">
			<SeasonForm seasonSlug={params.slug} />
		</AdminFormPageLayout>
	)
}
