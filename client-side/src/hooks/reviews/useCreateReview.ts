import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/review.service'
import type { IReviewCreate } from '@/shared/types/review.interface'
import { toast } from 'sonner'

export const useCreateReview = (sneakerSlug: string) => {
	const queryClient = useQueryClient()

	const { mutate: createReview, isPending } = useMutation({
		mutationFn: (variables: { data: IReviewCreate; sneakerId: string }) =>
			reviewService.createReview(variables.data, variables.sneakerId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['reviews', sneakerSlug] })
		},
		onError: err => {
			toast.error('Ошибка при создании отзыва')
		},
	})

	return { createReview, isPending }
}
