'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
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
import { Separator } from '@/components/ui/separator'
import { orderService } from '@/services/order.service'
import { userService } from '@/services/user.service'

import {
	useCartStore,
	type CartItem as CartItemType,
} from '@/stores/cart-store'

import {
	IOrderCreateData,
	IOrderItemCreateData,
	OrderStatus,
} from '@/shared/types/order.interface'
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
	const [isPlacingOrder, setIsPlacingOrder] = React.useState(false)
	const { clearCart } = useCartStore()

	const { data: profile, isLoading: isProfileLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: false,
	})

	const delivery = 350
	const finalPrice = totalPrice + delivery

	const handlePlaceOrder = async () => {
		if (!profile) {
			alert('Пожалуйста, войдите в систему, чтобы оформить заказ')
			return
		}

		setIsPlacingOrder(true)
		try {
			const orderItems: IOrderItemCreateData[] = items.map(item => ({
				quantity: 1,
				price: item.price,
				sneakerId: item.id,
				sizeId: item.sizeId,
			}))

			const orderData: IOrderCreateData = {
				items: orderItems,
				status: OrderStatus.PENDING,
			}

			console.log('Отправляю на бэкенд:', JSON.stringify(orderData, null, 2))

			const paymentResponse = await orderService.createOrder(orderData)

			if (paymentResponse?.confirmation?.confirmation_url) {
				clearCart()
				window.location.href = paymentResponse.confirmation.confirmation_url
			} else {
				console.error('Не удалось получить ссылку на оплату от сервера')
			}
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
		} finally {
			setIsPlacingOrder(false)
		}
	}

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
						<div className="flex-1 w-full flex-col overflow-y-auto py-4">
							<div className="space-y-5">
								{items.map(item => (
									<CartItem key={`${item.id}-${item.sizeId}`} item={item} />
								))}
							</div>
						</div>
						<div className="mt-auto border-t pt-5">
							<div className="space-y-2 text-sm">
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
								<Button
									className="w-full"
									onClick={handlePlaceOrder}
									disabled={isPlacingOrder || isProfileLoading || !profile}
								>
									{isPlacingOrder || isProfileLoading ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : !profile ? (
										'Войдите для оформления'
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
