// components/sheet-button-filter.tsx
import { Button } from './ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import React from 'react'

interface SheetButtonFilterProps<T> {
	text: string
	isLoading: boolean
	items?: T[]
	link: (item: T) => string
	getItemName: (item: T) => string
	loadingMessage: string
	notFoundMessage: string
	className?: string
}

export const SheetButtonFilter = <T extends { id: string | number }>({
	text,
	isLoading,
	items,
	link,
	getItemName,
	loadingMessage,
	notFoundMessage,
	className,
}: SheetButtonFilterProps<T>) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="button"
					className={cn(
						'text-xs w-40 h-11 flex items-center justify-center',
						className
					)}
				>
					<p>{text}</p>
				</Button>
			</SheetTrigger>
			<SheetContent side="top">
				<SheetHeader>
					<VisuallyHidden.Root>
						<SheetTitle />
					</VisuallyHidden.Root>
					<VisuallyHidden.Root>
						<SheetDescription />
					</VisuallyHidden.Root>
				</SheetHeader>
				<div className="overflow-y-scroll h-80 mb-4">
					{isLoading ? (
						<div>{loadingMessage}</div>
					) : items && items.length > 0 ? (
						items.map(item => (
							<div
								className="flex justify-center items-center hover:bg-foreground/10"
								key={item.id}
							>
								<Link
									href={link(item)}
									className="flex flex-col items-center justify-center w-full py-2"
								>
									<p>{getItemName(item)}</p>
								</Link>
							</div>
						))
					) : (
						<div>{notFoundMessage}</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
