import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reviewService } from '@/services/review.service'
import { toast } from 'sonner'

export const useDeleteReview = (sneakerSlug: string) => {
	const queryClient = useQueryClient()

	const { mutate: deleteReview, isPending } = useMutation({
		mutationFn: (reviewId: string) => reviewService.deleteReview(reviewId),
		onSuccess: () => {
			toast.success('Отзыв успешно удален!')
			queryClient.invalidateQueries({ queryKey: ['reviews', sneakerSlug] })
		},
		onError: err => {
			toast.error('Не удалось удалить отзыв. Попробуйте снова')
			console.error('Ошибка при удалении отзыва:', err)
		},
	})

	return { deleteReview, isPending }
}
