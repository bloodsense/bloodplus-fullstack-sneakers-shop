const SheetItemSkeleton = () => {
	return (
		<div className="flex justify-center items-center w-full py-2.5">
			<div className="h-5 w-50 bg-foreground/10 rounded-lg animate-pulse"></div>
		</div>
	)
}

export const SheetSkeletonList = () => {
	return (
		<div>
			{Array.from({ length: 5 }).map((_, index) => (
				<SheetItemSkeleton key={index} />
			))}
		</div>
	)
}
