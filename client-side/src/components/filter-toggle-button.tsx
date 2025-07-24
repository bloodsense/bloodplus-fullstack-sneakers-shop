'use client'

import { PanelLeftClose, PanelRightClose } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isOpen: boolean
}

export const FilterToggleButton: React.FC<Props> = ({
	isOpen,
	className,
	...props
}) => {
	return (
		<Button
			variant="outline"
			size="icon"
			className={cn('h-9 w-9', className)}
			{...props}
		>
			{isOpen ? (
				<PanelLeftClose className="h-5 w-5" />
			) : (
				<PanelRightClose className="h-5 w-5" />
			)}
			<span className="sr-only">
				{isOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
			</span>
		</Button>
	)
}
