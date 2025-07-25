import { Skeleton } from '@/components/ui/skeleton'

const CharacteristicRowSkeleton = () => (
	<div className="grid grid-cols-2 items-center border-t border-border/60 py-3 text-sm">
		<Skeleton className="h-4 w-1/4" />
		<Skeleton className="h-4 w-1/3" />
	</div>
)

export const SneakerDetailsSkeleton = () => {
	return (
		<>
			<section className="mb-12">
				<Skeleton className="h-7 w-1/5 mb-4" />
				<div className="space-y-3">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-4/5" />
				</div>
			</section>

			<section className="pt-8">
				<Skeleton className="h-7 w-1/4 mb-4" />
				<div className="mb-6">
					<Skeleton className="h-5 w-1/6 mb-2" />
					<CharacteristicRowSkeleton />
					<CharacteristicRowSkeleton />
					<CharacteristicRowSkeleton />
				</div>
				<div>
					<Skeleton className="h-5 w-1/5 mb-2" />
					<CharacteristicRowSkeleton />
					<CharacteristicRowSkeleton />
					<div className="border-b border-border/60">
						<CharacteristicRowSkeleton />
					</div>
				</div>
			</section>
		</>
	)
}
