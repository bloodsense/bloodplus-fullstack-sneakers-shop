'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { brandService } from '@/services/brand.service'
import { adminBrandService } from '@/services/admin/admin.brand.service'

export const useAdminBrands = () => {
	const queryClient = useQueryClient()

	const { data: brands, isLoading } = useQuery({
		queryKey: ['get all admin brands'],
		queryFn: () => brandService.getAllBrands(),
	})

	const { mutate: deleteBrand } = useMutation({
		mutationKey: ['delete brand'],
		mutationFn: (slug: string) => adminBrandService.deleteBrand(slug),
		onSuccess: () => {
			toast.success('Бренд успешно удален!')
			queryClient.invalidateQueries({ queryKey: ['get all admin brands'] })
		},
		onError: () => {
			toast.error('Произошла ошибка при удалении бренда')
		},
	})

	return {
		brands,
		isLoading,
		deleteBrand,
	}
}
