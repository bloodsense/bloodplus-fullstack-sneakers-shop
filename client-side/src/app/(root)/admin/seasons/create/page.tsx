import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo-constants'
import { SeasonForm } from '@/components/admin/season-form'

export const metadata: Metadata = {
	title: 'Создать сезон',
	...NO_INDEX_PAGE,
}

const CreateSeasonPage = () => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">Создать новый сезон</h1>
				<SeasonForm />
			</div>
		</Container>
	)
}

export default CreateSeasonPage
