import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/review.service'
import type { IReviewUpdate } from '@/shared/types/review.interface'
import { toast } from 'sonner'

export const useUpdateReview = (sneakerSlug: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateReview, isPending } = useMutation({
		mutationFn: (variables: { reviewId: string; data: IReviewUpdate }) =>
			reviewService.updateReview(variables.data, variables.reviewId),
		onSuccess: () => {
			toast.success('Отзыв успешно изменен!')
			queryClient.invalidateQueries({ queryKey: ['reviews', sneakerSlug] })
		},
		onError: err => {
			toast.error('Не удалось изменить отзыв')
			console.error('Ошибка при изменении отзыва:', err)
		},
	})

	return { updateReview, isPending }
}
