import { axiosDefault } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { IBrand } from '@/shared/types/brand.interface'

class BrandService {
	async getAllBrands() {
		const { data: getAllBrands } = await axiosDefault<IBrand[]>({
			url: API_URL.brands.getAll(),
			method: 'GET',
		})

		return getAllBrands
	}
}

export const brandService = new BrandService()
