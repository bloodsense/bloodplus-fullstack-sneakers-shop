import { Skeleton } from "../ui/skeleton"

export const BrowseCardSkeleton = () => {
	return (
		<div className="flex flex-col items-center rounded-xl">
			<Skeleton className="w-[200px] h-[180px] mb-3 rounded-lg" />
			<Skeleton className="w-3/4 h-4 mb-2 " />
			<Skeleton className="w-1/2 h-4" />
		</div>
	)
}
