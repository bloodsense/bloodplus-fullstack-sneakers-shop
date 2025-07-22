import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './ui/button'

interface NoResultsFoundProps {
	title?: string
	description?: string
	onReset?: () => void
	className?: string
}

export const NoResultsFound: React.FC<NoResultsFoundProps> = ({
	title = 'Кроссовки не найдены',
	description = 'Попробуйте изменить или сбросить выбранные параметры фильтрации',
	onReset,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center h-full w-full p-8  rounded-lg text-center',
				className
			)}
		>
			<h3 className="text-xl font-bold mb-1">{title}</h3>
			<p className="text-muted-foreground mb-6">{description}</p>
			{onReset && (
				<Button variant="default" onClick={onReset}>
					Сбросить все параметры
				</Button>
			)}
		</div>
	)
}
