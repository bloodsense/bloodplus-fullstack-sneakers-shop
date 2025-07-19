export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	home: () => '/',

	profile: () => '/profile',

	auth: {
		auth: () => '/auth',
		login: () => '/auth/login',
		register: () => '/auth/register',
		logout: () => '/auth/logout',
	},

	browse: {
		all: () => '/',
		men: () => '/browse/men',
		women: () => '/browse/women',
		season: (seasonSlug: string) => `/browse/season/${seasonSlug}`,
		brand: (brandSlug: string) => `/browse/brand/${brandSlug}`,
	},

	sneakers: {
		watch: (brandSlug: string, sneakerSlug: string) =>
			`/watch/${brandSlug}/${sneakerSlug}`,
		popular: () => '/watch/popular',
		similar: (slug: string) => `/similar/${slug}`,
	},
}

export const ADMIN_URL = {
	brands: {
		create: () => '/admin/brands/create',
		put: (slug: string) => `/admin/brands/put/${slug}`,
		delete: (slug: string) => `/admin/brands/delete/${slug}`,
		getBySlug: (slug: string) => `/admin/brands/getBySlug/${slug}`,
	},

	seasons: {
		create: () => '/admin/seasons/create',
		delete: (slug: string) => `/admin/seasons/delete/${slug}`,
		getBySlug: (slug: string) => `/admin/seasons/getBySlug/${slug}`,
	},

	colors: {
		create: () => '/admin/colors/create',
		put: (slug: string) => `/admin/colors/put/${slug}`,
		delete: (slug: string) => `/admin/colors/delete/${slug}`,
		getBySlug: (slug: string) => `/admin/colors/getBySlug/${slug}`,
	},

	sizes: {
		getAll: () => '/admin/sizes/getAll',
		create: () => '/admin/sizes/create',
		put: (id: string) => `/admin/sizes/put/${id}`,
		delete: (slug: string) => `/admin/sizes/delete/${slug}`,
		getById: (id: string) => `/admin/sizes/getById/${id}`,
	},

	sneakers: {
		create: () => '/admin/sneakers/create',
		put: (slug: string) => `/admin/sneakers/put/${slug}`,
		delete: (slug: string) => `/admin/sneakers/delete/${slug}`,
	},
}
