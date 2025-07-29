import { sneakerService } from '@/services/sneaker.service'
import { useQuery } from '@tanstack/react-query'

export const useSimilarSneakers = (slug: string) => {
	const {
		data: similarSneakers,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['similar sneakers', slug],

		queryFn: () => sneakerService.getSimilarSneakers(slug),

		enabled: !!slug,
	})

	return { similarSneakers, isLoading, isError }
}
