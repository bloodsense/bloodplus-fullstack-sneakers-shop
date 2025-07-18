import { IBrand } from './brand.interface'
import { IReview } from './review.interface'
import { IColor } from './color.interface'
import {
	ISneakerSizeStock,
	ISneakerSizeStockCreate,
} from './sneaker-size-stock.interface'
import { ISneakerInfo, ISneakerInfoCreate } from './sneaker-info.interface'
import { ISeason } from './season.interface'

export interface ISneaker {
	id: string
	createdAt: string
	updatedAt: string
	name: string
	price: number
	images: string[]
	description: string
	slug: string
	brand: IBrand
	season: ISeason
	reviews?: IReview[]
	color: IColor
	stocks: ISneakerSizeStock[]
	sneakerInfo?: ISneakerInfo
}

export interface ISneakerCreate {
	name: string
	price: number
	images: string[]
	description: string
	slug: string
	brandId: string
	seasonId: string
	colorId: string
	sneakerInfo?: ISneakerInfoCreate
	stocks: ISneakerSizeStockCreate[]
}
