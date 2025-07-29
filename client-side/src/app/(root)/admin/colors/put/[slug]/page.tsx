import { ColorForm } from '@/components/admin/color-form'
import { Container } from '@/components/container'

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
				{/* Передаем slug в компонент, чтобы хук внутри него знал, что нужно загрузить данные */}
				<ColorForm colorSlug={params.slug} />
			</div>
		</Container>
	)
}

export default EditColorPage
