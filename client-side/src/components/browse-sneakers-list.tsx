'use client'

import { cn } from '@/lib/utils'
import { Container } from './container'
import { SneakerCard } from './sneaker-card'
import { Skeleton } from './ui/skeleton'
import { useSneakers } from '@/hooks/useSneakers'

interface BrowseSneakersListProps {
	gender?: 'all' | 'men' | 'women'
	className?: string
}

export const BrowseSneakersList: React.FC<BrowseSneakersListProps> = ({
	gender = 'all',
	className,
}) => {
	const { sneakers, isLoading } = useSneakers(gender)

	const numberOfSkeletons = 20

	return (
		<Container className={cn('pt-10 mb-10', className)}>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-5 justify-items-center">
				{isLoading
					? Array.from({ length: numberOfSkeletons }).map((_, index) => (
							<div
								key={index}
								className="flex flex-col items-center rounded-xl"
							>
								<Skeleton className="w-[200px] h-[180px] mb-3 rounded-lg" />
								<Skeleton className="w-3/4 h-2 mb-3 " />
								<Skeleton className="w-1/2 h-2" />
							</div>
					  ))
					: (sneakers || []).map(sneaker => (
							<SneakerCard key={sneaker.id} sneaker={sneaker} />
					  ))}
			</div>
		</Container>
	)
}
