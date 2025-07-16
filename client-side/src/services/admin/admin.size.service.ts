import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { ISize } from '@/shared/types/size.interface'

class AdminSizeService {
	async getAllSizes() {
		const { data: getAllSizes } = await axiosWithAuth<ISize[]>({
			url: API_URL.sizes.admin.getAll(),
			method: 'GET',
		})

		return getAllSizes
	}

	async getSizeById(id: string) {
		const { data: getSizeById } = await axiosWithAuth<ISize>({
			url: API_URL.sizes.admin.getById(id),
			method: 'GET',
		})

		return getSizeById
	}

	async createSize(data: ISize) {
		const { data: createSize } = await axiosWithAuth<ISize>({
			url: API_URL.sizes.admin.create(),
			method: 'POST',
			data,
		})

		return createSize
	}

	async updateSize(data: ISize, id: string) {
		const { data: updateSize } = await axiosWithAuth<ISize>({
			url: API_URL.sizes.admin.update(id),
			method: 'PUT',
			data,
		})

		return updateSize
	}

	async deleteSize(id: string) {
		const { data: deleteSize } = await axiosWithAuth<ISize>({
			url: API_URL.sizes.admin.delete(id),
			method: 'DELETE',
		})

		return deleteSize
	}
}

export const sizeService = new AdminSizeService()
