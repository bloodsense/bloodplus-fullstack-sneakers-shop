import { cn } from '@/lib/utils'
import { Container } from './container'
import { SneakerCard } from './sneaker-card'

interface Props {
	className?: string
}

export const BrowseSneakers: React.FC<Props> = ({ className }) => {
	return (
		<Container className={cn('pt-10 mb-10', className)}>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 justify-items-center">
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
				<SneakerCard />
			</div>
		</Container>
	)
}
