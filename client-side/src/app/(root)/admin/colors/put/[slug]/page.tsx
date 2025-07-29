import { ColorForm } from '@/components/admin/color-form'
import { Container } from '@/components/container'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Редактировать цвет',
	...NO_INDEX_PAGE,
}

interface IEditPageProps {
	params: {
		slug: string
	}
}

const EditColorPage = ({ params }: IEditPageProps) => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Редактировать цвет</h1>

				<ColorForm colorSlug={params.slug} />
			</div>
		</Container>
	)
}

export default EditColorPage
