'use client'

import { useQueries } from '@tanstack/react-query'
import { brandService } from '@/services/brand.service'
import { seasonService } from '@/services/season.service'
import { colorService } from '@/services/color.service'
import { adminSizeService } from '@/services/admin/admin.size.service'

export const useAdminFormOptions = () => {
	const results = useQueries({
		queries: [
			{
				queryKey: ['get all admin brands for form'],
				queryFn: () => brandService.getAllBrands(),
			},
			{
				queryKey: ['get all admin seasons for form'],
				queryFn: () => seasonService.getAllSeasons(),
			},
			{
				queryKey: ['get all admin colors for form'],
				queryFn: () => colorService.getAllColors(),
			},
			{
				queryKey: ['get all admin sizes for form'],
				queryFn: () => adminSizeService.getAllSizes(),
			},
		],
	})

	const brands = results[0].data
	const seasons = results[1].data
	const colors = results[2].data
	const sizes = results[3].data
	const isLoading = results.some(query => query.isLoading)

	return {
		brands,
		seasons,
		colors,
		sizes,
		isLoading,
	}
}
