'use client'

import { FC } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useCreateReview } from '@/hooks/reviews/useCreateReview'
import { toast } from 'sonner'
import { useReviewForm } from '@/hooks/reviews/useReviewForm'
import { RatingStars } from '../rating-stars'

interface CreateReviewFormProps {
	sneakerId: string
	sneakerSlug: string
}

export const CreateReviewForm: FC<CreateReviewFormProps> = ({
	sneakerId,
	sneakerSlug,
}) => {
	const {
		text,
		setText,
		rating,
		setRating,
		hoverRating,
		setHoverRating,
		validate,
		reset,
	} = useReviewForm()
	const { createReview, isPending } = useCreateReview(sneakerSlug)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		createReview(
			{ data: { rating, text, sneakerId }, sneakerId },
			{
				onSuccess: () => {
					toast.success('Спасибо за обратную связь!')
					reset()
				},
			}
		)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-6 p-4 border rounded-lg space-y-4"
		>
			<div className="flex justify-between items-center">
				<h3 className="font-semibold">Оставить отзыв</h3>
				<RatingStars
					rating={rating}
					setRating={setRating}
					hoverRating={hoverRating}
					setHoverRating={setHoverRating}
				/>
			</div>
			<Textarea
				placeholder="Напишите Ваш отзыв здесь"
				value={text}
				onChange={e => setText(e.target.value)}
				rows={4}
			/>
			<Button
				variant="secondary"
				type="submit"
				disabled={isPending}
				className="w-full"
			>
				{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				Оставить отзыв
			</Button>
		</form>
	)
}
