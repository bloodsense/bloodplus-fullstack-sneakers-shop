import { ISneaker } from './sneaker.interface'

export interface ICartItem {
	id: number
	sneaker: ISneaker
	quantity: number
	price: number
}
