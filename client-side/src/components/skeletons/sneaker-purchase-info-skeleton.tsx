import { Skeleton } from '@/components/ui/skeleton'

export const SneakerPurchaseInfoSkeleton = () => {
	return (
		<div className="w-full bg-foreground/5 p-6 h-full rounded-lg space-y-4">
			<Skeleton className="h-5 w-3/4" />
			<Skeleton className="h-4 w-1/4" />
			<Skeleton className="h-10 w-full" />
			<div className="flex justify-between items-center">
				<Skeleton className="h-8 w-1/4" />
				<Skeleton className="h-10 w-1/3 rounded-md" />
			</div>
			<div className="mt-6 flex justify-center gap-4 mb-6">
				<Skeleton className="w-25 h-20 rounded-md" />
				<Skeleton className="w-25 h-20 rounded-md" />
				<Skeleton className="w-25 h-20 rounded-md" />
				<Skeleton className="w-25 h-20 rounded-md" />
				<Skeleton className="w-25 h-20 rounded-md" />
			</div>
			<div className="bg-foreground/5 rounded-lg p-4 space-y-2">
				<div className="flex items-center gap-2 text-xs">
					<Skeleton className="size-5 rounded-full" />
					<Skeleton className="h-6 w-full" />
				</div>
				<div className="flex items-center gap-2 text-xs pt-2">
					<Skeleton className="size-5 rounded-full" />
					<Skeleton className="h-6 w-full" />
				</div>
			</div>
		</div>
	)
}
