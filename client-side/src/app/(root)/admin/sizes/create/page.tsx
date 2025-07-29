import { SizeForm } from '@/components/admin/size-form'
import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'

export const metadata: Metadata = {
	title: 'Создать размер',
	...NO_INDEX_PAGE,
}

const CreateSizePage = () => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Создать новый размер</h1>
				<SizeForm />
			</div>
		</Container>
	)
}

export default CreateSizePage
