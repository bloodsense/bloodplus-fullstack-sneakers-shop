import { FC } from 'react'
import { Star } from 'lucide-react'

interface RatingStarsProps {
	rating: number
	setRating?: (rating: number) => void
	setHoverRating?: (rating: number) => void
	hoverRating?: number
	isStatic?: boolean
	starSize?: string
}

export const RatingStars: FC<RatingStarsProps> = ({
	rating,
	setRating,
	setHoverRating,
	hoverRating = 0,
	isStatic = false,
	starSize = 'h-4 w-4',
}) => {
	const effectiveRating = hoverRating || rating

	return (
		<div className="flex items-center space-x-1">
			{[1, 2, 3, 4, 5].map(star => (
				<Star
					key={star}
					className={`${starSize} ${
						!isStatic ? 'cursor-pointer' : ''
					} transition-colors ${
						effectiveRating >= star
							? 'text-background/50 fill-foreground'
							: 'text-foreground/20'
					}`}
					onClick={() => !isStatic && setRating?.(star)}
					onMouseEnter={() => !isStatic && setHoverRating?.(star)}
					onMouseLeave={() => !isStatic && setHoverRating?.(0)}
				/>
			))}
		</div>
	)
}
