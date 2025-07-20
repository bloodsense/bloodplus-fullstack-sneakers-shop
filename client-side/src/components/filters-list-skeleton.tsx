import React from 'react'
import { Skeleton } from './ui/skeleton'

interface FilterListSkeletonProps {
	count?: number
}

export const FilterListSkeleton: React.FC<FilterListSkeletonProps> = ({
	count = 4,
}) => {
	return (
		<div className="flex flex-col gap-4 py-2 ">
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={index} className="h-3 w-40 rounded-md" />
			))}
		</div>
	)
}
