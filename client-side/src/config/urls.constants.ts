export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	home: () => '/',

	profile: () => '/profile',

	auth: () => '/auth',

	browse: {
		all: () => '/',
		men: () => '/browse/men',
		women: () => '/browse/women',
		season: (seasonSlug: string) => `/browse/season/${seasonSlug}`,
		brand: (brandSlug: string) => `/browse/brand/${brandSlug}`,
		sneakersByBrand: (brandSlug: string, sneakerSlug: string) =>
			`/browse/brand/${brandSlug}/${sneakerSlug}`,
	},

	sneakers: {
		popular: () => '/watch/popular',
		favorites: () => '/favorites',
		similar: (slug: string) => `/similar/${slug}`,
		search: (query: string) => `/search?q=${query}`,
	},
}

export const ADMIN_URL = {
	brands: {
		page: () => '/admin/brands',
		create: () => '/admin/brands/create',
		put: (slug: string) => `/admin/brands/put/${slug}`,
		delete: (slug: string) => `/admin/brands/delete/${slug}`,
		getBySlug: (slug: string) => `/admin/brands/getBySlug/${slug}`,
	},

	seasons: {
		page: () => '/admin/seasons',
		put: (slug: string) => `/admin/seasons/put/${slug}`,
		create: () => '/admin/seasons/create',
		delete: (slug: string) => `/admin/seasons/delete/${slug}`,
		getBySlug: (slug: string) => `/admin/seasons/getBySlug/${slug}`,
	},

	colors: {
		page: () => '/admin/colors',
		create: () => '/admin/colors/create',
		put: (slug: string) => `/admin/colors/put/${slug}`,
		delete: (slug: string) => `/admin/colors/delete/${slug}`,
		getBySlug: (slug: string) => `/admin/colors/getBySlug/${slug}`,
	},

	sizes: {
		page: () => '/admin/sizes',
		getAll: () => '/admin/sizes/getAll',
		create: () => '/admin/sizes/create',
		put: (id: string) => `/admin/sizes/put/${id}`,
		delete: (id: string) => `/admin/sizes/delete/${id}`,
		getById: (id: string) => `/admin/sizes/getById/${id}`,
	},

	sneakers: {
		page: () => '/admin/sneakers',
		create: () => '/admin/sneakers/create',
		put: (slug: string) => `/admin/sneakers/put/${slug}`,
		delete: (slug: string) => `/admin/sneakers/delete/${slug}`,
	},
}
