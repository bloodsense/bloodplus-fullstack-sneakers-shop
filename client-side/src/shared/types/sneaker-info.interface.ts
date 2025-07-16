export interface ISneakerInfo {
	gender: string
	season: string
	protection?: string
	warranty?: string
	warrantyTime?: string
	country?: string
	code?: string
	id?: string
	createdAt?: string
	updatedAt?: string
}

export interface ISneakerInfoCreate {
	gender: string
	season: string
	protection?: string
	warranty?: string
	warrantyTime?: string
	country?: string
	code?: string
}
