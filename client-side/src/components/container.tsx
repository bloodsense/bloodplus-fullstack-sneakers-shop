import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface Props {
	className?: string
}

export const Container: React.FC<PropsWithChildren<Props>> = ({
	children,
	className,
}) => {
	return (
		<div className={cn('max-w-[1380px] mx-auto px-10', className)}>
			{children}
		</div>
	)
}
