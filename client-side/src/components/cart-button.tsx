'use client'

import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { formatPriceWithK } from '@/lib/formatters'
import { cn } from '@/lib/utils'

export interface CartButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	itemCount: number
	totalPrice: number
}

export const CartButton = React.forwardRef<HTMLButtonElement, CartButtonProps>(
	({ className, itemCount, totalPrice, ...props }, ref) => {
		const formattedPrice = formatPriceWithK(totalPrice)

		return (
			<Button
				ref={ref}
				variant="outline"
				className={cn(
					'group relative flex items-center justify-between',
					className
				)}
				{...props}
			>
				<span className="mr-2">{itemCount} т.</span>
				<div className="h-full w-px bg-foreground/50" />
				<div className="relative flex items-center justify-center overflow-hidden pl-2">
					<span className="transition-opacity duration-300 group-hover:opacity-0">
						{formattedPrice} ₽
					</span>
					<ArrowRight className="absolute h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-5" />
				</div>
			</Button>
		)
	}
)

CartButton.displayName = 'CartButton'
