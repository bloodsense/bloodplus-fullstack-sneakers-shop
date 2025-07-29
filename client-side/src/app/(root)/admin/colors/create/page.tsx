import { ColorForm } from '@/components/admin/color-form'
import { Container } from '@/components/container'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Создать цвет',
	...NO_INDEX_PAGE,
}

const CreateColorPage = () => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Создать новый цвет</h1>
				<ColorForm />
			</div>
		</Container>
	)
}

export default CreateColorPage
