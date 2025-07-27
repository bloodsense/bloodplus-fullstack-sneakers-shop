import { Skeleton } from '../ui/skeleton'

export const HeaderButtonsSkeleton = () => {
	return (
		<div className="flex h-9 w-[259px] items-center justify-center rounded-md border border-input bg-muted/50">
			<Skeleton className="h-full w-full" />
		</div>
	)
}
