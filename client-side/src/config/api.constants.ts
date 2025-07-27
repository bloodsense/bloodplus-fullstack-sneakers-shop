export const SERVER_URL = process.env.SERVER_URL as string

export const API_PREFIX = 'api'

export const API_URL = {
	root: (path = '') => `/${API_PREFIX}${path}`,

	auth: {
		login: () => API_URL.root('/auth/login'),
		register: () => API_URL.root('/auth/register'),
		logout: () => API_URL.root('/auth/logout'),
		accessToken: () => API_URL.root('/auth/login/access-token'),
	},

	users: {
		profile: () => API_URL.root('/profile'),
		favorites: (sneakerSlug: string) =>
			API_URL.root(`/profile/favorites/${sneakerSlug}`),
		favoritesSync: () => API_URL.root('/profile/favorites/sync'),
	},

	sneakers: {
		getAll: () => API_URL.root('/'),

		getSimilar: (slug: string) => API_URL.root(`/similar/${slug}`),

		search: (query: string) => API_URL.root(`/search?q=${query}`),

		getBySlugs: () => API_URL.root('/sneakers/by-slugs'),

		browse: {
			men: () => API_URL.root('/browse/men'),
			women: () => API_URL.root('/browse/women'),
			brand: (brandSlug: string) => API_URL.root(`/browse/brand/${brandSlug}`),
			season: (seasonSlug: string) =>
				API_URL.root(`/browse/season/${seasonSlug}`),
		},

		watch: {
			getWithBrand: (brandSlug: string, sneakerSlug: string) =>
				API_URL.root(`/watch/${brandSlug}/${sneakerSlug}`),
			popular: () => API_URL.root('/watch/popular'),
		},

		admin: {
			create: () => API_URL.root('/admin/sneakers/create'),
			update: (slug: string) => API_URL.root(`/admin/sneakers/put/${slug}`),
			delete: (slug: string) => API_URL.root(`/admin/sneakers/delete/${slug}`),
		},
	},

	brands: {
		getAll: () => API_URL.root('/brands/all'),
		admin: {
			getBySlug: (slug: string) =>
				API_URL.root(`/admin/brands/getBySlug/${slug}`),
			create: () => API_URL.root('/admin/brands/create'),
			update: (slug: string) => API_URL.root(`/admin/brands/put/${slug}`),
			delete: (slug: string) => API_URL.root(`/admin/brands/delete/${slug}`),
		},
	},

	seasons: {
		getAll: () => API_URL.root('/seasons/all'),
		admin: {
			getBySlug: (slug: string) =>
				API_URL.root(`/admin/seasons/getBySlug/${slug}`),
			create: () => API_URL.root('/admin/seasons/create'),
			update: (slug: string) => API_URL.root(`/admin/seasons/put/${slug}`),
			delete: (slug: string) => API_URL.root(`/admin/seasons/delete/${slug}`),
		},
	},

	colors: {
		getAll: () => API_URL.root('/colors/all'),
		admin: {
			getBySlug: (slug: string) =>
				API_URL.root(`/admin/colors/getBySlug/${slug}`),
			create: () => API_URL.root('/admin/colors/create'),
			update: (slug: string) => API_URL.root(`/admin/colors/put/${slug}`),
			delete: (slug: string) => API_URL.root(`/admin/colors/delete/${slug}`),
		},
	},

	sizes: {
		admin: {
			getAll: () => API_URL.root('/admin/sizes/getAll'),
			getById: (id: string) => API_URL.root(`/admin/sizes/getById/${id}`),
			create: () => API_URL.root('/admin/sizes/create'),
			update: (id: string) => API_URL.root(`/admin/sizes/put/${id}`),
			delete: (id: string) => API_URL.root(`/admin/sizes/delete/${id}`),
		},
	},

	orders: {
		create: () => API_URL.root('/orders/create'),
		updateStatus: () => API_URL.root('/orders/status'),
	},

	reviews: {
		root: (path = '') => API_URL.root(`/reviews${path}`),
		getBySneakerSlug: (sneakerSlug: string) =>
			API_URL.root(`/reviews/${sneakerSlug}`),
		getById: (id: string) => API_URL.root(`/reviews/${id}`),
		create: (sneakerId: string) => API_URL.root(`/reviews/create/${sneakerId}`),
		update: (id: string) => API_URL.root(`/reviews/put/${id}`),
		delete: (id: string) => API_URL.root(`/reviews/delete/${id}`),
	},

	files: {
		root: (path = '') => API_URL.root(`/files${path}`),
		upload: (folder?: string) =>
			API_URL.root(`/files${folder ? `?folder=${folder}` : ''}`),
	},
}
