import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface IAdminPageHeaderProps {
	title: string
	createUrl: string
	buttonText: string
}

export const AdminPageHeader = ({
	title,
	createUrl,
	buttonText,
}: IAdminPageHeaderProps) => {
	return (
		<div className="flex items-center justify-between mb-4">
			<h1 className="text-2xl font-bold">{title}</h1>
			<Link href={createUrl}>
				<Button>{buttonText}</Button>
			</Link>
		</div>
	)
}
