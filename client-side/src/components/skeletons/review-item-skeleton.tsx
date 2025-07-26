import { Skeleton } from '@/components/ui/skeleton'

export const ReviewItemSkeleton = () => {
	return (
		<div className="flex gap-4">
			<Skeleton className="h-9 w-9 rounded-full" />
			<div className="flex-1 min-w-0">
				<div className="flex justify-between items-start">
					<div>
						<Skeleton className="h-3 w-20" />
						<Skeleton className="h-4 w-28 mt-1" />
					</div>
					<Skeleton className="h-4 w-16" />
				</div>
				<div className="mt-2 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</div>
		</div>
	)
}
