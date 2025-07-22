import { useQuery } from '@tanstack/react-query'
import { IBrand } from '@/shared/types/brand.interface'
import { brandService } from '@/services/brand.service'

export function useFilterBrands(enabled: boolean = true) {
	const { data: brands, isLoading } = useQuery<IBrand[]>({
		queryKey: ['brands'],
		queryFn: () => brandService.getAllBrands(),
		staleTime: Infinity,
		enabled: enabled,
	})

	return { brands, isLoading }
}
