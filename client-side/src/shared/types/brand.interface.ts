export interface IBrand {
	id: string
	name: string
	slug: string
}

export interface IBrandCreate extends Pick<IBrand, 'name' | 'slug'> {}
