import { Container } from '@/components/container'

interface IAdminFormPageLayoutProps {
	title: string
	children: React.ReactNode
}

export const AdminFormPageLayout = ({
	title,
	children,
}: IAdminFormPageLayoutProps) => {
	return (
		<Container>
			<div className="p-4 md:p-8">
				<h1 className="text-2xl font-bold mb-6">{title}</h1>
				{children}
			</div>
		</Container>
	)
}
