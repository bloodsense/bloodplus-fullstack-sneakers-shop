import { ISneakerSizeStock } from './sneaker-size-stock.interface'

export interface IOrderItem {
	quantity: number
	price: number
	orderId?: string
	sneakerSizeStock: ISneakerSizeStock
	sneakerId: string
	sizeId: string
	id: string
	createdAt: string
	updatedAt: string
}
