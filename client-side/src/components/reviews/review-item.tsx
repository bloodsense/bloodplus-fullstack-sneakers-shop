'use client'

import { FC, useState } from 'react'
import { Loader2, Edit } from 'lucide-react'
import dayjs from '@/lib/dayjs'
import type { IReview } from '@/shared/types/review.interface'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useDeleteReview } from '@/hooks/reviews/useDeleteReview'
import { useUpdateReview } from '@/hooks/reviews/useUpdateReview'
import { useReviewForm } from '@/hooks/reviews/useReviewForm'
import { RatingStars } from '../rating-stars'

interface ReviewItemProps {
	review: IReview & { id: string }
	sneakerSlug: string
	currentUserId?: string
}

export const ReviewItem: FC<ReviewItemProps> = ({
	review,
	sneakerSlug,
	currentUserId,
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const {
		text: editedText,
		setText: setEditedText,
		rating: editedRating,
		setRating: setEditedRating,
		hoverRating,
		setHoverRating,
		validate,
	} = useReviewForm(review.text, review.rating)

	const { deleteReview, isPending: isDeleting } = useDeleteReview(sneakerSlug)
	const { updateReview, isPending: isUpdating } = useUpdateReview(sneakerSlug)

	const canEditOrDelete = review.user?.id === currentUserId

	const handleUpdate = () => {
		if (!validate()) return

		updateReview(
			{ reviewId: review.id, data: { rating: editedRating, text: editedText } },
			{ onSuccess: () => setIsEditing(false) }
		)
	}

	const handleCancel = () => {
		setIsEditing(false)
		setEditedText(review.text)
		setEditedRating(review.rating)
	}

	return (
		<div className="flex gap-4">
			<Avatar className="h-9 w-9">
				<AvatarImage src={review.user?.picture} alt={review.user?.name} />
				<AvatarFallback>{review.user?.name?.[0]}</AvatarFallback>
			</Avatar>

			<div className="flex-1 min-w-0">
				<div className="flex justify-between items-start">
					<div>
						{isEditing ? (
							<RatingStars
								rating={editedRating}
								setRating={setEditedRating}
								hoverRating={hoverRating}
								setHoverRating={setHoverRating}
							/>
						) : (
							<RatingStars rating={review.rating} isStatic starSize="h-3 w-3" />
						)}
						<p className="text-sm pt-1 text-foreground/50">
							{review.user?.name}
						</p>
					</div>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						{canEditOrDelete && !isEditing && (
							<>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => setIsEditing(true)}
									className="h-7 w-7"
								>
									<Edit className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => deleteReview(review.id)}
									disabled={isDeleting}
								>
									{isDeleting ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										'Удалить отзыв'
									)}
								</Button>
							</>
						)}
						<p>{dayjs(review.createdAt).format('DD.MM.YYYY')}</p>
					</div>
				</div>

				<div className="mt-2 text-sm">
					{isEditing ? (
						<div className="space-y-2">
							<Textarea
								value={editedText}
								onChange={e => setEditedText(e.target.value)}
								rows={3}
								className="text-sm"
							/>
							<div className="flex justify-end gap-2">
								<Button variant="ghost" size="sm" onClick={handleCancel}>
									Отмена
								</Button>
								<Button size="sm" onClick={handleUpdate} disabled={isUpdating}>
									{isUpdating && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									Сохранить
								</Button>
							</div>
						</div>
					) : (
						<p className="break-words">{review.text}</p>
					)}
				</div>
			</div>
		</div>
	)
}
