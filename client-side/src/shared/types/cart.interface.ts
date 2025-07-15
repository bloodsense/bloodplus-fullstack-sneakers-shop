import { ISneaker } from './sneaker.interface'

export interface ICartItem {
	id: number
	sneakers: ISneaker
	quantity: number
	price: number
}
