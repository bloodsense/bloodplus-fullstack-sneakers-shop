import { BrandForm } from '@/components/admin/brand-form'
import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'

export const metadata: Metadata = {
	title: 'Редактировать бренд',
	...NO_INDEX_PAGE,
}

interface IEditPageProps {
	params: {
		slug: string
	}
}

const EditBrandPage = ({ params }: IEditPageProps) => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Редактировать бренд</h1>
				<BrandForm brandSlug={params.slug} />
			</div>
		</Container>
	)
}

export default EditBrandPage
