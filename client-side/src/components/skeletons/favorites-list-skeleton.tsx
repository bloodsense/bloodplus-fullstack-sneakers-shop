import { Skeleton } from '../ui/skeleton'

export const FavoritesListSkeleton = () => {
	return (
		<div className="space-y-4 pt-4">
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className="flex items-center justify-between space-x-6 p-4 bg-foreground/5 rounded-lg"
				>
					<div className="flex flex-grow items-center space-x-6">
						<Skeleton className="w-24 h-24 rounded-md flex-shrink-0" />
						<div className="flex-grow space-y-3">
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-3 w-1/2" />
							<Skeleton className="h-4 w-1/3 mt-2" />
						</div>
					</div>

					<Skeleton className="h-9 w-[220px] rounded-md flex-shrink-0" />
				</div>
			))}
		</div>
	)
}
