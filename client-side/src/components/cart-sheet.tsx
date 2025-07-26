'use client'

import * as React from 'react'
import { ShoppingCart } from 'lucide-react'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from './ui/button'
import { formatFullPrice } from '@/lib/formatters'
import { Separator } from '@/components/ui/separator'
import { CartButton } from './cart-button'

interface CartSheetProps {
	itemCount: number
	totalPrice: number
}

export const CartSheet: React.FC<CartSheetProps> = ({
	itemCount,
	totalPrice,
}) => {
	const delivery = 350
	const finalPrice = totalPrice + delivery

	return (
		<Sheet>
			<SheetTrigger asChild>
				<CartButton itemCount={itemCount} totalPrice={totalPrice} />
			</SheetTrigger>
			<SheetContent
				side="right"
				className="flex w-full flex-col sm:max-w-lg p-5"
			>
				<SheetHeader className="space-y-2.5 ">
					<SheetTitle>Корзина ({itemCount})</SheetTitle>
				</SheetHeader>

				{itemCount > 0 ? (
					<>
						<div className="flex-1 w-full flex-col overflow-y-auto">
							<div className="space-y-5">Товары</div>
						</div>

						<div className="mt-auto border-t pt-5">
							<div className="space-y-1.5 text-sm">
								<div className="flex">
									<span className="flex-1">Товары ({itemCount})</span>
									<span>{formatFullPrice(totalPrice)} ₽</span>
								</div>
								<div className="flex">
									<span className="flex-1">Доставка</span>
									<span>{formatFullPrice(delivery)} ₽</span>
								</div>
							</div>
							<Separator className="my-4" />
							<div className="flex font-semibold text-base">
								<span className="flex-1">Итого</span>
								<span>{formatFullPrice(finalPrice)} ₽</span>
							</div>
							<SheetFooter className="mt-5">
								<Button className="w-full">Перейти к оплате</Button>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex h-full flex-col items-center justify-center space-y-2">
						<ShoppingCart
							className="h-16 w-16 text-muted-foreground"
							aria-hidden="true"
						/>
						<span className="text-lg font-medium text-muted-foreground">
							Ваша корзина пуста
						</span>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}
