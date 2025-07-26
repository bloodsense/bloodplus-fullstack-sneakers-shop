import React from 'react'
import { Separator } from '@/components/ui/separator'
import { ReviewItemSkeleton } from './review-item-skeleton'

export const ReviewsSkeleton = () => (
	<div className="space-y-4">
		{[1, 2, 3].map((item, index) => (
			<React.Fragment key={item}>
				<ReviewItemSkeleton />
				{index < 2 && <Separator />}
			</React.Fragment>
		))}
	</div>
)
