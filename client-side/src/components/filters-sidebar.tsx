'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './ui/button'
import { FiltersAccordion } from './filters-accordion'
import { useProductFilters } from '@/hooks/filters/useProductFilters'
import useLocalStorageState from '@/hooks/useLocalStorage'
import { MAX_PRICE, MIN_PRICE } from '@/constants/filter-price-constants'
import { ChevronLeft, Tag, Palette, SunSnow, DollarSign } from 'lucide-react'
import { FiltersShowSkeleton } from './skeletons/filters-show-skeleton'

interface Props {
	filters: ReturnType<typeof useProductFilters>
	isBrandFilterDisabled?: boolean
	isSeasonFilterDisabled?: boolean
	onVisibilityChange: (isVisible: boolean) => void
}

export const FiltersSidebar: React.FC<Props> = ({
	filters,
	isBrandFilterDisabled,
	isSeasonFilterDisabled,
	onVisibilityChange,
}) => {
	const [isFiltersVisible, setIsFiltersVisible] = useLocalStorageState(
		'isFiltersVisible',
		true
	)

	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	React.useEffect(() => {
		onVisibilityChange(isFiltersVisible)
	}, [isFiltersVisible, onVisibilityChange])

	const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(
		() => {
			const defaultOpen: string[] = []
			if (filters.selectedBrands.length > 0) defaultOpen.push('brand')
			if (filters.selectedSeasons.length > 0) defaultOpen.push('season')
			if (filters.selectedColors.length > 0) defaultOpen.push('color')
			if (
				filters.priceRange[0] !== MIN_PRICE ||
				filters.priceRange[1] !== MAX_PRICE
			) {
				defaultOpen.push('price')
			}
			return defaultOpen
		}
	)

	return (
		<div
			className={cn(
				'sticky top-38.5 self-start flex flex-col h-[calc(100vh-10.5rem)]',
				isMounted && 'transition-all duration-300 ease-in-out',
				isFiltersVisible ? 'w-[320px]' : 'w-16'
			)}
		>
			{!isMounted ? (
				<FiltersShowSkeleton />
			) : (
				<>
					<div className="relative flex-grow overflow-hidden">
						<div
							className={cn(
								'absolute inset-0 transition-opacity duration-300 ease-in-out',
								isFiltersVisible
									? 'opacity-100'
									: 'opacity-0 pointer-events-none'
							)}
						>
							<div className="h-full overflow-y-auto overflow-x-hidden">
								<FiltersAccordion
									{...filters}
									isBrandFilterDisabled={isBrandFilterDisabled}
									isSeasonFilterDisabled={isSeasonFilterDisabled}
									openAccordionItems={openAccordionItems}
									onOpenChange={setOpenAccordionItems}
								/>
							</div>
						</div>
						<div
							className={cn(
								'absolute inset-0 transition-opacity duration-300 ease-in-out',
								isFiltersVisible
									? 'opacity-0 pointer-events-none'
									: 'opacity-100'
							)}
						>
							<div className="flex flex-col items-center space-y-4 pt-3">
								<Tag className="text-muted-foreground" />
								<SunSnow className="text-muted-foreground" />
								<Palette className="text-muted-foreground" />
								<DollarSign className="text-muted-foreground" />
							</div>
						</div>
					</div>
					<Button
						variant="outline"
						className="w-full mt-auto shrink-0"
						onClick={() => setIsFiltersVisible(prev => !prev)}
					>
						<ChevronLeft
							className={cn(
								'h-4 w-4 transition-transform duration-300 ease-in-out',
								isFiltersVisible ? 'mr-2' : 'rotate-180'
							)}
						/>
					</Button>
				</>
			)}
		</div>
	)
}
