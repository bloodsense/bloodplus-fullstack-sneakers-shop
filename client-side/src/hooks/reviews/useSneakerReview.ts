import { useQuery } from '@tanstack/react-query'
import { reviewService } from '@/services/review.service'

export const useSneakerReviews = (sneakerSlug: string) => {
	const {
		data: reviews,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['reviews', sneakerSlug],
		queryFn: () => reviewService.getReviewsBySneakerSlug(sneakerSlug),
	})

	return { reviews, isLoading, isError }
}
