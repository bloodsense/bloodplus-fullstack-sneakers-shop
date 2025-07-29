export enum SizeType {
	RU = 'RU',
	EU = 'EU',
}

export interface ISize {
	id: string
	value: string
	type: SizeType
}

export interface ISizeCreate extends Pick<ISize, 'value' | 'type'> {}
