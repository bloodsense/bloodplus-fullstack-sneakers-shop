import { MAX_PRICE, MIN_PRICE } from '@/constants/filter-price-constants'
import { usePathname, useRouter } from 'next/navigation'

import { useSearchParams } from 'next/navigation'
import React from 'react'

export function useProductFilters() {
	const router = useRouter()
	const pathname = usePathname()
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

	const createQueryString = React.useCallback(
		(paramsToUpdate: Record<string, string | null>) => {
			const params = new URLSearchParams(searchParams.toString())
			for (const [key, value] of Object.entries(paramsToUpdate)) {
				if (value === null) {
					params.delete(key)
				} else {
					params.set(key, value)
				}
			}
			return params.toString()
		},
		[searchParams]
	)

	const updateUrl = (queryString: string) => {
		router.push(`${pathname}?${queryString}`)
	}

	const handleBrandChange = (brandSlug: string) => {
		const newBrands = selectedBrands.includes(brandSlug)
			? selectedBrands.filter(slug => slug !== brandSlug)
			: [...selectedBrands, brandSlug]
		updateUrl(
			createQueryString({
				brands: newBrands.length > 0 ? newBrands.join(',') : null,
			})
		)
	}

	const handleSeasonChange = (seasonSlug: string) => {
		const newSeasons = selectedSeasons.includes(seasonSlug)
			? selectedSeasons.filter(slug => slug !== seasonSlug)
			: [...selectedSeasons, seasonSlug]
		updateUrl(
			createQueryString({
				seasons: newSeasons.length > 0 ? newSeasons.join(',') : null,
			})
		)
	}

	const handleColorChange = (colorSlug: string) => {
		const newColors = selectedColors.includes(colorSlug)
			? selectedColors.filter(slug => slug !== colorSlug)
			: [...selectedColors, colorSlug]
		updateUrl(
			createQueryString({
				colors: newColors.length > 0 ? newColors.join(',') : null,
			})
		)
	}

	const handlePriceChange = (values: [number, number]) => {
		const isDefaultPrice = values[0] === MIN_PRICE && values[1] === MAX_PRICE

		updateUrl(
			createQueryString({
				minPrice: isDefaultPrice ? null : String(values[0]),
				maxPrice: isDefaultPrice ? null : String(values[1]),
			})
		)
	}

	const resetFilters = () => {
		router.push(pathname)
	}

	return {
		selectedBrands,
		selectedSeasons,
		selectedColors,
		priceRange,
		handleBrandChange,
		handleSeasonChange,
		handleColorChange,
		handlePriceChange,
		resetFilters,
	}
}
