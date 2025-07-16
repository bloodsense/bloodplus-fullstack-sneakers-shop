import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { ISneaker, ISneakerCreate } from '@/shared/types/sneaker.interface'

class AdminSneakerService {
	async createSneaker(data: ISneakerCreate) {
		const { data: createSneakers } = await axiosWithAuth<ISneaker>({
			url: API_URL.sneakers.admin.create(),
			method: 'POST',
			data,
		})

		return createSneakers
	}

	async updateSneaker(slug: string, data: ISneakerCreate) {
		const { data: updateSneakers } = await axiosWithAuth<ISneaker>({
			url: API_URL.sneakers.admin.update(slug),
			method: 'PUT',
			data,
		})

		return updateSneakers
	}

	async deleteSneaker(slug: string) {
		const { data: deleteSneakers } = await axiosWithAuth<void>({
			url: API_URL.sneakers.admin.delete(slug),
			method: 'DELETE',
		})

		return deleteSneakers
	}
}

export const adminSneakerService = new AdminSneakerService()
