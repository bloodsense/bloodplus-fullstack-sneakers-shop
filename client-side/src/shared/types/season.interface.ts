export interface ISeason {
	id: string
	name: string
	slug: string
}

export interface ISeasonCreate extends Pick<ISeason, 'name' | 'slug'> {}
