import { IOrder } from './order.interface'
import { IReview } from './review.interface'
import { ISneaker } from './sneaker.interface'

export interface IUser {
	name: string
	email: string
	password?: string
	picture: string
	favorites: ISneaker[]
	reviews?: IReview[]
	orders: IOrder[]
}
