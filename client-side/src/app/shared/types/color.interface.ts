export interface IColor {
	id: string
	createdAt: string
	value: string
	hex: string
	slug: string
}

export interface IColorCreate extends Pick<IColor, 'value' | 'hex' | 'slug'> {}
