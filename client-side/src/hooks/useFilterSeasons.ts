import { useQuery } from '@tanstack/react-query'
import { ISeason } from '@/shared/types/season.interface'
import { seasonService } from '@/services/season.service'

export function useFilterSeasons() {
	const { data: seasons, isLoading } = useQuery<ISeason[]>({
		queryKey: ['seasons'],
		queryFn: () => seasonService.getAllSeasons(),
		staleTime: Infinity,
	})

	return { seasons, isLoading }
}
