export interface ISneakerInfo {
	gender: string
	season: string
	protection?: string
	warranty?: string
	warrantyTime?: string
	country?: string
	code?: string
}

export interface ISneakerInfoCreate extends ISneakerInfo {
	sneakerId: string
	sneaker: string
}
