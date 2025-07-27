import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '@/components/container'
import { OrderCardSkeleton } from './order-card-skeleton'

export const ProfileSkeleton = () => {
	return (
		<Container className="pt-10 mb-10">
			<div className="mb-8 flex items-center justify-between pb-4 bg-foreground/5 p-4 rounded-lg h-27">
				<div className="flex items-center space-x-4">
					<Skeleton className="h-11 w-11 rounded-full" />
					<div className="space-y-3">
						<Skeleton className="h-4 w-[200px]" />
						<Skeleton className="h-4 w-[150px]" />
						<Skeleton className="h-4 w-[250px]" />
					</div>
				</div>
				<Skeleton className="h-9 w-[100px]" />
			</div>

			<div className="mt-8">
				<ul className="mt-4 space-y-5">
					<OrderCardSkeleton />
					<OrderCardSkeleton />
					<OrderCardSkeleton />
				</ul>
			</div>
		</Container>
	)
}
