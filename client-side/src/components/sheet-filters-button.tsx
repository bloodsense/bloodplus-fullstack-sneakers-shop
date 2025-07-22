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
import { CaretDownIcon } from '@radix-ui/react-icons'
import { useQuery } from '@tanstack/react-query'

interface SheetButtonFilterProps<T> {
	text: string
	queryKey: string[]
	queryFn: () => Promise<T[]>
	link: (item: T) => string
	getItemName: (item: T) => string
	loadingMessage: string
	notFoundMessage: string
	className?: string
}

export const SheetButtonFilter = <T extends { id: string | number }>({
	text,
	queryKey,
	queryFn,
	link,
	getItemName,
	loadingMessage,
	notFoundMessage,
	className,
}: SheetButtonFilterProps<T>) => {
	const [isOpen, setIsOpen] = React.useState(false)

	const { data: items, isLoading } = useQuery<T[]>({
		queryKey: queryKey,
		queryFn: queryFn,
		enabled: isOpen,
		staleTime: Infinity,
	})

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant="button"
					className={cn(
						'text-xs w-40 h-11 flex items-center justify-center relative group gap-1',
						className
					)}
				>
					<p>{text}</p>
					<CaretDownIcon
						className="opacity-0 transition-opacity duration-00 group-hover:opacity-100"
						aria-hidden="true"
					/>
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
				<div className="overflow-y-scroll h-full mb-4">
					{isLoading ? (
						<div>{loadingMessage}</div>
					) : items && items.length > 0 ? (
						items.map(item => (
							<div
								className="flex justify-center items-center hover:bg-foreground/10"
								key={item.id}
								onClick={() => setIsOpen(false)}
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
