import { IOrderItem } from './order-item.interface'
import { ISneakerSizeStock } from './sneaker-size-stock.interface'
import { IUser } from './user.interface'

interface IAmount {
	value: string
	currency: string
}

interface IRecipient {
	account_id: string
	gateway_id: string
}

interface IPaymentMethod {
	type: string
	id: string
	saved: boolean
}

interface IConfirmation {
	type: string
	return_url: string
	confirmation_url: string
}

export interface IPaymentResponse {
	id: string
	status: string
	amount: IAmount
	recipient: IRecipient
	payment_method: IPaymentMethod
	confirmation: IConfirmation
	created_at: Date
}

export enum OrderStatus {
	PENDING = 'PENDING',
	SUCCESS = 'SUCCESS',
	CANCELLED = 'CANCELLED',
}

export interface IOrder {
	id: string
	createdAt: string
	updatedAt: string
	items: IOrderItem[]
	status: OrderStatus
	user?: IUser
	userId?: string
	totalAmount: number
}

export interface IOrderItemCreateData {
	quantity: number
	price: number
	sneakerId: string
	sizeId: string
}

export interface IOrderCreateData {
	status?: OrderStatus
	items: IOrderItemCreateData[]
}
