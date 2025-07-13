import { ISneakerSizeStock } from './sneaker-size-stock.interface'

export interface IOrderItem {
	id: string
	createdAt: string
	updatedAt: string
	quantity: number
	price: number
	orderId?: string
	sneakerSizeStock: ISneakerSizeStock
	sneakerId: string
	sizeId: string
}
