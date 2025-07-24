'use client'

import { cn } from '@/lib/utils'
import { Container } from './container'
import { SneakerCard } from './sneaker-card'
import { Skeleton } from './ui/skeleton'
import { useSneakers } from '@/hooks/useSneakers'
import React from 'react'
import { NoResultsFound } from './no-results-found'
import { gridConstants } from '@/constants/grid-constants'
import { useProductFilters } from '@/hooks/filters/useProductFilters'
import { useFilteredSneakers } from '@/hooks/filters/useFilteredSneakers'
import { FiltersSidebar } from './filters-sidebar'

interface BrowseSneakersListProps {
	gender?: 'all' | 'men' | 'women'
	className?: string
	gridCols?: 4 | 5 | 6 | 7 | 8
	brandSlug?: string
	seasonSlug?: string
}

export const BrowseSneakersList: React.FC<BrowseSneakersListProps> = ({
	gender = 'all',
	className,
	gridCols = 4,
	brandSlug,
	seasonSlug,
}) => {
	const { sneakers, isLoading, isError } = useSneakers(
		gender,
		brandSlug,
		seasonSlug
	)
	const numberOfSkeletons = 20
	const gridColsVariants = gridConstants
	const filters = useProductFilters()
	const filteredSneakers = useFilteredSneakers(sneakers, filters)
	const hasFilters =
		gender === 'men' || gender === 'women' || brandSlug || seasonSlug
	const isListEmpty = !isLoading && !isError && filteredSneakers.length === 0

	const [areFiltersVisible, setAreFiltersVisible] = React.useState(true)
	const currentGridCols = areFiltersVisible ? gridCols : 5

	return (
		<Container className={cn('pt-10 mb-10', className)}>
			<div
				className={cn(
					hasFilters
						? 'grid grid-cols-[auto_1fr] gap-x-10'
						: 'flex justify-center'
				)}
			>
				{hasFilters && (
					<FiltersSidebar
						filters={filters}
						isBrandFilterDisabled={!!brandSlug}
						isSeasonFilterDisabled={!!seasonSlug}
						onVisibilityChange={setAreFiltersVisible}
					/>
				)}
				<div
					className={cn(
						!isListEmpty && 'self-start',
						'justify-items-center',
						isListEmpty
							? 'flex items-center justify-center'
							: `grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8 ${gridColsVariants[currentGridCols]}`,
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
					) : isListEmpty ? (
						<NoResultsFound onReset={filters.resetFilters} />
					) : (
						filteredSneakers.map(sneaker => (
							<SneakerCard key={sneaker.id} sneaker={sneaker} />
						))
					)}
				</div>
			</div>
		</Container>
	)
}
