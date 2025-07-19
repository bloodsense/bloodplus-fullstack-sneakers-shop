import { sneakerService } from '@/services/sneaker.service'
import { useQuery } from '@tanstack/react-query'
import { ISneaker } from '@/shared/types/sneaker.interface'

type Gender = 'all' | 'men' | 'women'

export function useSneakers(gender: Gender = 'all') {
	const queryFnMap = {
		all: () => sneakerService.getAllSneakers(),
		men: () => sneakerService.browseMenSneakers(),
		women: () => sneakerService.browseWomenSneakers(),
	}

	const queryKeyMap = {
		all: 'all-sneakers',
		men: 'men-sneakers',
		women: 'women-sneakers',
	}

	const { data: sneakers, isLoading } = useQuery<ISneaker[]>({
		queryKey: [queryKeyMap[gender]],
		queryFn: queryFnMap[gender],
		staleTime: Infinity,
	})

	return { sneakers, isLoading }
}
