import { colorService } from '@/services/color.service'
import { IColor } from '@/shared/types/color.interface'
import { useQuery } from '@tanstack/react-query'

export function useFilterColors(enabled: boolean = true) {
	const { data: colors, isLoading } = useQuery<IColor[]>({
		queryKey: ['colors'],
		queryFn: () => colorService.getAllColors(),
		staleTime: Infinity,
		enabled: enabled,
	})

	return { colors, isLoading }
}
