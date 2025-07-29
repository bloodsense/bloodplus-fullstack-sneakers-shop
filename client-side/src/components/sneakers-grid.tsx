import { cn } from '@/lib/utils'
import React from 'react'

interface SneakersGridProps {
	children: React.ReactNode
	className?: string
}

export const SneakersGrid: React.FC<SneakersGridProps> = ({
	children,
	className,
}) => {
	return (
		<div
			className={cn(
				'self-start justify-items-center grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-8',
				className
			)}
		>
			{children}
		</div>
	)
}
