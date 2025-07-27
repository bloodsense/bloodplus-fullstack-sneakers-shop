'use client'

import * as React from 'react'
import { Loader2, ShoppingCart } from 'lucide-react'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { formatFullPrice } from '@/lib/formatters'
import { useProfile } from '@/hooks/useProfile'
import { usePlaceOrder } from '@/hooks/usePlaceOrder'
import type { CartItem as CartItemType } from '@/stores/cart-store'
import { CartButton } from './cart-button'
import { CartItem } from './cart-item'

interface CartSheetProps {
	items: CartItemType[]
	itemCount: number
	totalPrice: number
}

export const CartSheet: React.FC<CartSheetProps> = ({
	items,
	itemCount,
	totalPrice,
}) => {
	const { profile, isLoading: isProfileLoading } = useProfile()
	const { placeOrder, isPlacingOrder } = usePlaceOrder()

	const delivery = 350
	const finalPrice = totalPrice + delivery

	return (
		<Sheet>
			<SheetTrigger asChild>
				<CartButton itemCount={itemCount} totalPrice={totalPrice} />
			</SheetTrigger>
			<SheetContent side="right" className="flex w-full flex-col sm:max-w-lg">
				<SheetHeader className="space-y-2.5 px-6 pt-4 pb-4 border-b">
					<SheetTitle>Корзина ({itemCount})</SheetTitle>
				</SheetHeader>

				{itemCount > 0 ? (
					<>
						<div className="flex-1 w-full flex-col overflow-y-auto px-4">
							<div className="space-y-4">
								{items.map(item => (
									<CartItem key={`${item.id}-${item.sizeId}`} item={item} />
								))}
							</div>
						</div>
						<div className="mt-auto border-t pt-5 pb-6">
							<div className="space-y-2 text-sm px-6">
								<div className="flex">
									<span className="flex-1">Товары ({itemCount})</span>
									<span>{formatFullPrice(totalPrice)} ₽</span>
								</div>
								<div className="flex">
									<span className="flex-1">Доставка</span>
									<span>{formatFullPrice(delivery)} ₽</span>
								</div>
							</div>
							<div className="h-px w-full border-t my-4" />
							<div className="flex font-semibold text-base px-6">
								<span className="flex-1">Итого</span>
								<span>{formatFullPrice(finalPrice)} ₽</span>
							</div>
							<SheetFooter className="mt-5 px-6">
								<Button
									className="w-full"
									onClick={placeOrder}
									disabled={isPlacingOrder || isProfileLoading || !profile}
								>
									{isPlacingOrder || isProfileLoading ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : !profile ? (
										'Войдите в систему для оформления заказа'
									) : (
										'Перейти к оплате'
									)}
								</Button>
							</SheetFooter>
						</div>
					</>
				) : (
					<div className="flex h-full flex-col items-center justify-center space-y-2">
						<ShoppingCart
							className="h-16 w-16 text-muted-foreground"
							strokeWidth={1}
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
