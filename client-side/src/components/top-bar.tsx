import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Container } from './container'
import { Button } from './ui/button'

interface Props {
	className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
	const browseLinks = [
		{ id: 1, link: '/browse/men', category: 'Мужское' },
		{ id: 2, link: '/browse/women', category: 'Женское' },
	]

	const buttonLinks = [
		{
			id: 1,
			category: 'Сезон',
		},
		{
			id: 2,
			category: 'Бренды',
		},
	]

	return (
		<div className="sticky top-[69px] z-20 border-b bg-background/60 backdrop-blur-xl">
			<Container>
				<div
					className={cn('flex justify-center items-center gap-10 ', className)}
				>
					{browseLinks.map(({ id, link, category }) => (
						<div
							key={id}
							className="flex items-center justify-center w-40 h-11"
						>
							<Link href={link} className="text-xs">
								<p>{category}</p>
							</Link>
						</div>
					))}
					{buttonLinks.map(({ id, category }) => (
						<div
							key={id}
							className="flex items-center justify-center w-40 h-11"
						>
							<Button variant="button" className="text-xs">
								<p>{category}</p>
							</Button>
						</div>
					))}
				</div>
			</Container>
		</div>
	)
}
