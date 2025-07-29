import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { IColor } from '@/shared/types/color.interface'

export type IColorFields = Omit<IColor, 'id'>

class AdminColorService {
	async getColorBySlug(slug: string) {
		const { data: getColorBySlug } = await axiosWithAuth<IColor>({
			url: API_URL.colors.admin.getBySlug(slug),
			method: 'GET',
		})

		return getColorBySlug
	}

	async createColor(data: IColorFields) {
		const { data: createColor } = await axiosWithAuth<IColor>({
			url: API_URL.colors.admin.create(),
			method: 'POST',
			data,
		})

		return createColor
	}

	async updateColor(data: IColorFields, slug: string) {
		const { data: updateColor } = await axiosWithAuth<IColor>({
			url: API_URL.colors.admin.update(slug),
			method: 'PUT',
			data,
		})

		return updateColor
	}

	async deleteColor(slug: string) {
		const { data: deleteColor } = await axiosWithAuth<IColor>({
			url: API_URL.colors.admin.delete(slug),
			method: 'DELETE',
		})

		return deleteColor
	}
}

export const adminColorService = new AdminColorService()
