import { Skeleton } from '../ui/skeleton'

export const OrderCardSkeleton = () => {
	return (
		<li className="flex flex-col rounded-lg border shadow-sm">
			<div className="flex items-center justify-between border-b px-5 pt-5 pb-3">
				<Skeleton className="h-6 w-[150px]" />
				<Skeleton className="h-4 w-[120px]" />
			</div>

			<div className="space-y-3 px-5 py-4">
				<div className="flex items-center gap-4">
					<Skeleton className="h-16 w-22 rounded-md" />
					<div className="flex-grow space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
					</div>
				</div>
			</div>
			<div className="flex items-end justify-between border-t px-5 pt-4 pb-5">
				<Skeleton className="h-7 w-[100px]" />
				<Skeleton className="h-7 w-[120px] rounded-full" />
			</div>
		</li>
	)
}
