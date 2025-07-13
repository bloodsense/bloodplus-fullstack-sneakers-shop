export interface ISneakerInfo {
	id: string
	gender: string
	season: string
	protection?: string
	warranty?: string
	warrantyTime?: string
	country?: string
	code?: string
}

export interface ISneakerInfoCreate
	extends Omit<ISneakerInfo, 'id' | 'sneakerId' | 'sneaker'> {}
