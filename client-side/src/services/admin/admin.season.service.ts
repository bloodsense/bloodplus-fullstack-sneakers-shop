import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { ISeason, ISeasonCreate } from '@/shared/types/season.interface'

class AdminSeasonService {
	async getSeasonBySlug(slug: string) {
		const { data: getSeasonBySlug } = await axiosWithAuth<ISeason>({
			url: API_URL.seasons.admin.getBySlug(slug),
			method: 'GET',
		})

		return getSeasonBySlug
	}

	async createSeason(data: ISeasonCreate) {
		const { data: createSeason } = await axiosWithAuth<ISeason>({
			url: API_URL.seasons.admin.create(),
			method: 'POST',
			data,
		})

		return createSeason
	}

	async updateSeason(data: ISeasonCreate, slug: string) {
		const { data: updateSeason } = await axiosWithAuth<ISeason>({
			url: API_URL.seasons.admin.update(slug),
			method: 'PUT',
			data,
		})

		return updateSeason
	}

	async deleteSeason(slug: string) {
		const { data: deleteSeason } = await axiosWithAuth<ISeason>({
			url: API_URL.seasons.admin.delete(slug),
			method: 'DELETE',
		})

		return deleteSeason
	}
}

export const adminSeasonService = new AdminSeasonService()
