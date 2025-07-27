import { axiosDefault } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { ISneaker } from '@/shared/types/sneaker.interface'

class SneakerService {
	async getAllSneakers() {
		const { data: getAllSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.getAll(),
			method: 'GET',
		})

		return getAllSneakers
	}

	async searchSneakers(query: string) {
		const { data: searchedSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.search(query),
			method: 'GET',
		})

		return searchedSneakers
	}

	async getSimilarSneakers(slug: string) {
		const { data: getSimilarSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.getSimilar(slug),
			method: 'GET',
		})

		return getSimilarSneakers
	}

	async browseMenSneakers() {
		const { data: browseMenSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.browse.men(),
			method: 'GET',
		})

		return browseMenSneakers
	}

	async browseWomenSneakers() {
		const { data: browseWomenSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.browse.women(),
			method: 'GET',
		})

		return browseWomenSneakers
	}

	async browseBrandSneakers(brandSlug: string) {
		const { data: browseBrandSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.browse.brand(brandSlug),
			method: 'GET',
		})

		return browseBrandSneakers
	}

	async browseSeasonSneakers(seasonSlug: string) {
		const { data: browseSeasonSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.browse.season(seasonSlug),
			method: 'GET',
		})

		return browseSeasonSneakers
	}

	async watchSneakerByBrand(brandSlug: string, sneakerSlug: string) {
		const { data: watchSneakerByBrand } = await axiosDefault<ISneaker>({
			url: API_URL.sneakers.watch.getWithBrand(brandSlug, sneakerSlug),
			method: 'GET',
		})

		return watchSneakerByBrand
	}

	async watchPopularSneakers() {
		const { data: watchPopularSneakers } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.watch.popular(),
			method: 'GET',
		})

		return watchPopularSneakers
	}

	async getBySlugs(slugs: string[]) {
		const { data } = await axiosDefault<ISneaker[]>({
			url: API_URL.sneakers.getBySlugs(),
			method: 'POST',
			data: { slugs },
		})
		return data
	}
}

export const sneakerService = new SneakerService()
