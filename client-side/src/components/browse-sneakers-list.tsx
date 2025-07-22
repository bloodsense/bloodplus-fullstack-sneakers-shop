'use client'

import { cn } from '@/lib/utils'
import { Container } from './container'
import { SneakerCard } from './sneaker-card'
import { Skeleton } from './ui/skeleton'
import { useSneakers } from '@/hooks/useSneakers'
import { FiltersAccordion } from './filters-accordion'
import React from 'react'
import { NoResultsFound } from './no-results-found'
import { gridConstants } from '@/constants/grid-constants'
import { useProductFilters } from '@/hooks/filters/useProductFilters'
import { useFilteredSneakers } from '@/hooks/filters/useFilteredSneakers'

interface BrowseSneakersListProps {
	gender?: 'all' | 'men' | 'women'
	className?: string
	gridCols?: 4 | 5 | 6 | 7 | 8
}

export const BrowseSneakersList: React.FC<BrowseSneakersListProps> = ({
	gender = 'all',
	className,
	gridCols = 5,
}) => {
	const { sneakers, isLoading } = useSneakers(gender)
	const numberOfSkeletons = 20
	const gridColsVariants = gridConstants
	const filters = useProductFilters()
	const filteredSneakers = useFilteredSneakers(sneakers, filters)
	const hasFilters = gender === 'men' || gender === 'women'

	return (
		<Container className={cn('pt-10 mb-10', className)}>
			<div
				className={cn(
					hasFilters
						? 'grid grid-cols-[auto_1fr] gap-x-10 items-start'
						: 'flex justify-center'
				)}
			>
				{hasFilters && (
					<div className="sticky top-38.5 self-start">
						<FiltersAccordion {...filters} />
					</div>
				)}
				<div
					className={cn(
						`grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8 justify-items-center`,
						gridColsVariants[gridCols],
						className
					)}
				>
					{isLoading ? (
						Array.from({ length: numberOfSkeletons }).map((_, index) => (
							<div
								key={index}
								className="flex flex-col items-center rounded-xl"
							>
								<Skeleton className="w-[200px] h-[180px] mb-3 rounded-lg" />
								<Skeleton className="w-3/4 h-2 mb-3 " />
								<Skeleton className="w-1/2 h-2" />
							</div>
						))
					) : filteredSneakers.length > 0 ? (
						filteredSneakers.map(sneaker => (
							<SneakerCard key={sneaker.id} sneaker={sneaker} />
						))
					) : (
						<NoResultsFound
							className="col-span-full"
							onReset={filters.resetFilters}
						/>
					)}
				</div>
			</div>
		</Container>
	)
}
