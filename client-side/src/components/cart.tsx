import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { formatPriceWithK } from '@/lib/formatters'

interface Props {
	itemCount: number
	totalPrice: number
}

export const Cart: React.FC<Props> = ({ itemCount, totalPrice }) => {
	const formattedPrice = formatPriceWithK(totalPrice)

	return (
		<Button
			variant="outline"
			className="group relative flex items-center justify-between"
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
