import { axiosDefault } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { IColor } from '@/shared/types/color.interface'

class ColorService {
	async getAllColors() {
		const { data: getAllColors } = await axiosDefault<IColor[]>({
			url: API_URL.colors.getAll(),
			method: 'GET',
		})

		return getAllColors
	}
}

export const colorService = new ColorService()
