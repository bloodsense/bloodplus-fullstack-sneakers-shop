import { Skeleton } from '@/components/ui/skeleton'

export const ReviewItemSkeleton = () => {
	return (
		<div className="flex gap-4">
			<Skeleton className="h-9 w-9 rounded-full" />
			<div className="flex-1 min-w-0">
				<div className="flex justify-between items-start gap-4">
					<Skeleton className="h-8 w-32 rounded-lg" />
					<div className="flex items-center gap-3">
						<Skeleton className="h-3 w-20 rounded" />
						<Skeleton className="h-4 w-24 rounded" />
					</div>
				</div>
				<div className="mt-1 space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</div>
		</div>
	)
}
