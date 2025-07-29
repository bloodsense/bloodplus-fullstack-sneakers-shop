import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const AdminFormSkeleton = () => {
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-1/3" />
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full" />
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<Skeleton className="h-6 w-1/4" />
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
