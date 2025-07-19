import { useQuery } from '@tanstack/react-query'
import { ISeason } from '@/shared/types/season.interface'
import { seasonService } from '@/services/season.service'

export function useFilterSeasons(enabled: boolean = true) {
	const { data: seasons, isLoading } = useQuery<ISeason[]>({
		queryKey: ['seasons'],
		queryFn: () => seasonService.getAllSeasons(),
		staleTime: Infinity,
		enabled: enabled,
	})

	return { seasons, isLoading }
}
