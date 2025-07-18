import { axiosDefault } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { ISeason } from '@/shared/types/season.interface'

class SeasonService {
	async getAllSeasons() {
		const { data: getAllSeasons } = await axiosDefault<ISeason[]>({
			url: API_URL.seasons.getAll(),
			method: 'GET',
		})

		return getAllSeasons
	}
}

export const seasonService = new SeasonService()
