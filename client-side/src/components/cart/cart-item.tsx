'use client'

import * as React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatFullPrice } from '@/lib/formatters'
import { useCartStore } from '@/stores/cart-store'
import type { CartItem as CartItemType } from '@/stores/cart-store'

interface CartItemProps {
	item: CartItemType
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const { removeItem } = useCartStore()

	return (
		<div className="flex items-center space-x-4 bg-foreground/5 p-3 rounded-md">
			<div className="relative h-20 w-26 overflow-hidden rounded-sm">
				<Image
					src={item.images[0]}
					alt={item.name}
					fill
					sizes="80px"
					className="object-cover"
				/>
			</div>
			<div className="flex-1 text-sm">
				<p className="font-medium">{item.name}</p>
				<p className="text-muted-foreground">Размер: {item.selectedSize}</p>
				<p className="text-muted-foreground">{formatFullPrice(item.price)} ₽</p>
			</div>
			<Button
				variant="outline"
				size="icon"
				className="h-8 w-8"
				onClick={() => removeItem(item.id, item.selectedSize)}
			>
				<X className="h-4 w-4" />
			</Button>
		</div>
	)
}
