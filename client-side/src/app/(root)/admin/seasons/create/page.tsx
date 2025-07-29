import { SeasonForm } from '@/components/admin/season-form'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Создать сезон',
	...NO_INDEX_PAGE,
}

export default function CreateSeasonPage() {
	return (
		<AdminFormPageLayout title="Создать новый сезон">
			<SeasonForm />
		</AdminFormPageLayout>
	)
}
