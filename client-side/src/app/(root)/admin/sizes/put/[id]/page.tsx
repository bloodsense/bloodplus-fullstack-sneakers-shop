import { SizeForm } from '@/components/admin/size-form'
import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'

export const metadata: Metadata = {
	title: 'Редактировать размер',
	...NO_INDEX_PAGE,
}

interface IEditPageProps {
	params: {
		id: string
	}
}

const EditSizePage = ({ params }: IEditPageProps) => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Редактировать размер</h1>
				<SizeForm sizeId={params.id} />
			</div>
		</Container>
	)
}

export default EditSizePage
