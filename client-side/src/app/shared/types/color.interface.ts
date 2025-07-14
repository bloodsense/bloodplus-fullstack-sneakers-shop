export interface IColor {
	value: string
	hex: string
	slug: string
}

export interface IColorCreate extends Pick<IColor, 'value' | 'hex' | 'slug'> {}
