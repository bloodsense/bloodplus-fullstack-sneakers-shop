import { ColorForm } from '@/components/admin/color-form'
import { Container } from '@/components/container'
import { AdminFormPageLayout } from '@/components/ui/admin/admin-form-page-layout'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Создать цвет',
	...NO_INDEX_PAGE,
}

const CreateColorPage = () => {
	return (
		<AdminFormPageLayout title="Создать новый бренд">
			<ColorForm />
		</AdminFormPageLayout>
	)
}

export default CreateColorPage
