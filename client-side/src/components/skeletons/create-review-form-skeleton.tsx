import { Skeleton } from '@/components/ui/skeleton'

export const CreateReviewFormSkeleton = () => {
	return (
		<div className="mb-6 p-4 border rounded-lg space-y-4">
			<div className="flex justify-between items-center">
				<Skeleton className="h-5 w-32" />
				<Skeleton className="h-5 w-28" />
			</div>
			<Skeleton className="h-24 w-full" />
			<Skeleton className="h-10 w-full" />
		</div>
	)
}
