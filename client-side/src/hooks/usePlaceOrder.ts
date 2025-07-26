import { useState } from 'react'
import { useCartStore } from '@/stores/cart-store'
import { orderService } from '@/services/order.service'
import {
	IOrderCreateData,
	IOrderItemCreateData,
	OrderStatus,
} from '@/shared/types/order.interface'

export const usePlaceOrder = () => {
	const [isPlacingOrder, setIsPlacingOrder] = useState(false)
	const { items, clearCart } = useCartStore()

	const placeOrder = async () => {
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

			const paymentResponse = await orderService.createOrder(orderData)

			if (paymentResponse?.confirmation?.confirmation_url) {
				clearCart()
				window.location.href = paymentResponse.confirmation.confirmation_url
			} else {
				console.error('Не удалось получить ссылку на оплату от сервера.')
			}
		} catch (error) {
			console.error('Ошибка при создании заказа:', error)
		} finally {
			setIsPlacingOrder(false)
		}
	}

	return { placeOrder, isPlacingOrder }
}
