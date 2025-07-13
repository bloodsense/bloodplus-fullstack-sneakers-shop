import { ISneaker } from './sneaker.interface'
import { ISize } from './size.interface'
import { IOrderItem } from './order-item.interface'

export interface ISneakerSizeStock {
	sneakerId: string
	sizeId: string
	quantity: number
	createdAt: string
	updatedAt: string
	sneaker: ISneaker
	size: ISize
	orderItems?: IOrderItem[]
}

export interface ISneakerSizeStockCreate
	extends Pick<ISneakerSizeStock, 'quantity' | 'sizeId'> {}
