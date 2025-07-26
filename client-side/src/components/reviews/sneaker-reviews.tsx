'use client'

import { FC } from 'react'
import React from 'react'
import type { ISneaker } from '@/shared/types/sneaker.interface'
import type { IUser } from '@/shared/types/user.interface'
import { Separator } from '@/components/ui/separator'
import { useSneakerReviews } from '@/hooks/reviews/useSneakerReview'
import { CreateReviewForm } from './create-review-form'
import { ReviewItem } from './review-item'
import { ReviewsSkeleton } from '../skeletons/reviews-skeleton'

interface SneakerReviewsProps {
	sneaker: ISneaker
	profile?: IUser | null
}

export const SneakerReviews: FC<SneakerReviewsProps> = ({
	sneaker,
	profile,
}) => {
	const { reviews, isLoading, isError } = useSneakerReviews(sneaker.slug)
	const hasUserAlreadyReviewed =
		reviews?.some(review => review.user?.id === profile?.id) ?? false
	const canLeaveReview = profile && !hasUserAlreadyReviewed

	return (
		<div className="pt-5">
			<h2 className="text-xl font-semibold mb-6">
				Отзывы {!isLoading && `(${reviews?.length ?? 0})`}
			</h2>

			{isLoading && <ReviewsSkeleton />}
			{isError && <p>Не удалось загрузить отзывы</p>}
			{!isLoading && !isError && (
				<div className="space-y-4">
					{reviews && reviews.length > 0 ? (
						reviews.map((review, index) => (
							<React.Fragment key={(review as any).id}>
								<ReviewItem
									review={review as any}
									sneakerSlug={sneaker.slug}
									currentUserId={profile?.id}
								/>
								{index < reviews.length - 1 && <Separator />}
							</React.Fragment>
						))
					) : (
						<p className="text-muted-foreground text-center mb-10">
							У этого товара пока нет отзывов
						</p>
					)}
				</div>
			)}

			{canLeaveReview && (
				<div className="mt-10">
					<CreateReviewForm sneakerId={sneaker.id} sneakerSlug={sneaker.slug} />
				</div>
			)}
		</div>
	)
}
