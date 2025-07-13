import { ISneaker } from './sneaker.interface'
import { IUser } from './user.interface'

export interface IReview {
	id: string
	createdAt: string
	text: string
	rating: number
	user?: IUser
	sneaker?: ISneaker
}

export interface IReviewCreate extends Pick<IReview, 'rating' | 'text'> {
	sneakerId: string
}
