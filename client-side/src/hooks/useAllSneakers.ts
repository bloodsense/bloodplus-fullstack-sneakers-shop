import { sneakerService } from '@/services/sneaker.service'
import { useQuery } from '@tanstack/react-query'

export function useAllSneakers() {
	const { data: sneakers, isLoading } = useQuery({
		queryKey: ['all-sneakers'],
		queryFn: () => sneakerService.getAllSneakers(),
	})

	return { sneakers, isLoading }
}
