import { ISneaker } from '@/shared/types/sneaker.interface'
import React from 'react'

interface Filters {
	selectedBrands: string[]
	selectedSeasons: string[]
	selectedColors: string[]
	priceRange: [number, number]
}

export function useFilteredSneakers(
	sneakers: ISneaker[] | undefined,
	filters: Filters
) {
	const { selectedBrands, selectedSeasons, selectedColors, priceRange } =
		filters

	const filteredSneakers = React.useMemo(() => {
		if (!sneakers) return []

		return sneakers
			.filter(sneaker => {
				if (selectedBrands.length === 0) return true
				return selectedBrands.includes(sneaker.brand.slug)
			})
			.filter(sneaker => {
				if (selectedSeasons.length === 0) return true
				return selectedSeasons.includes(sneaker.season.slug)
			})
			.filter(sneaker => {
				if (selectedColors.length === 0) return true
				return selectedColors.includes(sneaker.color.slug)
			})
			.filter(sneaker => {
				return sneaker.price >= priceRange[0] && sneaker.price <= priceRange[1]
			})
	}, [sneakers, selectedBrands, selectedSeasons, selectedColors, priceRange])

	return filteredSneakers
}
