import { useSearchParams } from 'next/navigation'
import React from 'react'

const MIN_PRICE = 0
const MAX_PRICE = 100000

export function useFilters() {
	const searchParams = useSearchParams()

	const selectedBrands = React.useMemo(
		() => searchParams.get('brands')?.split(',') || [],
		[searchParams]
	)

	const selectedSeasons = React.useMemo(
		() => searchParams.get('seasons')?.split(',') || [],
		[searchParams]
	)

	const selectedColors = React.useMemo(
		() => searchParams.get('colors')?.split(',') || [],
		[searchParams]
	)

	const priceRange = React.useMemo((): [number, number] => {
		const min = searchParams.get('minPrice')
		const max = searchParams.get('maxPrice')
		return [min ? Number(min) : MIN_PRICE, max ? Number(max) : MAX_PRICE]
	}, [searchParams])

	return {
		selectedBrands,
		selectedSeasons,
		selectedColors,
		priceRange,
	}
}
