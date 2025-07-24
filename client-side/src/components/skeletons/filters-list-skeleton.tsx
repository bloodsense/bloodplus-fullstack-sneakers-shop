import React from 'react'
import { Skeleton } from '../ui/skeleton'

interface FiltersListSkeletonProps {
	count?: number
}

export const FiltersListSkeleton: React.FC<FiltersListSkeletonProps> = ({
	count = 5,
}) => {
	return (
		<div className="flex flex-col gap-4 py-2 ">
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={index} className="h-3 w-40 rounded-md" />
			))}
		</div>
	)
}
