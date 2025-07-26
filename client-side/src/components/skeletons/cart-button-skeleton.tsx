import { Loader2 } from 'lucide-react'

export const CartButtonSkeleton = () => {
	return (
		<div className="flex h-9 w-[137px] items-center justify-center rounded-md border border-input">
			<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
		</div>
	)
}
