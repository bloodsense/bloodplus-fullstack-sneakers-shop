import { sneakerService } from '@/services/sneaker.service'
import { useQuery } from '@tanstack/react-query'
import { ISneaker } from '@/shared/types/sneaker.interface'

type Gender = 'all' | 'men' | 'women'

export function useSneakers(
	gender: Gender = 'all',
	brandSlug?: string,
	seasonSlug?: string
) {
	const queryKey = (() => {
		if (brandSlug) {
			return ['sneakers-by-brand', brandSlug]
		}
		if (seasonSlug) {
			return ['sneakers-by-season', seasonSlug]
		}
		return [`sneakers-${gender}`]
	})()

	const queryFn = () => {
		if (brandSlug) {
			return sneakerService.browseBrandSneakers(brandSlug)
		}

		if (seasonSlug) {
			return sneakerService.browseSeasonSneakers(seasonSlug)
		}

		switch (gender) {
			case 'men':
				return sneakerService.browseMenSneakers()
			case 'women':
				return sneakerService.browseWomenSneakers()
			case 'all':
			default:
				return sneakerService.getAllSneakers()
		}
	}

	const {
		data: sneakers,
		isLoading,
		isError,
		error,
	} = useQuery<ISneaker[]>({
		queryKey: queryKey,
		queryFn: queryFn,
		staleTime: Infinity,
		retry: (failureCount, error: any) => {
			if (error.response?.status === 404) {
				return false
			}

			return failureCount < 3
		},
	})

	return { sneakers, isLoading, isError, error }
}
