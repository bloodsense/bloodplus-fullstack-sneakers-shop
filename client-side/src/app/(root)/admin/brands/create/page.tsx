import { BrandForm } from '@/components/admin/brand-form'
import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'

export const metadata: Metadata = {
	title: 'Создать бренд',
	...NO_INDEX_PAGE,
}

const CreateBrandPage = () => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Создать новый бренд</h1>
				<BrandForm />
			</div>
		</Container>
	)
}

export default CreateBrandPage
