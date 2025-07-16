import { axiosWithAuth } from '@/api/api.interceptors'
import { IBrand, IBrandCreate } from './../../shared/types/brand.interface'
import { API_URL } from '@/config/api.constants'

class AdminBrandService {
	async getBrandBySlug(slug: string) {
		const { data: getBrandBySlug } = await axiosWithAuth<IBrand>({
			url: API_URL.brands.admin.getBySlug(slug),
			method: 'GET',
		})

		return getBrandBySlug
	}

	async createBrand(data: IBrandCreate) {
		const { data: createBrand } = await axiosWithAuth<IBrand>({
			url: API_URL.brands.admin.create(),
			method: 'POST',
			data,
		})

		return createBrand
	}

	async updateBrand(data: IBrandCreate, slug: string) {
		const { data: updateBrand } = await axiosWithAuth<IBrand>({
			url: API_URL.brands.admin.update(slug),
			method: 'PUT',
			data,
		})

		return updateBrand
	}

	async deleteBrand(slug: string) {
		const { data: deleteBrand } = await axiosWithAuth<IBrand>({
			url: API_URL.brands.admin.delete(slug),
			method: 'DELETE',
		})

		return deleteBrand
	}
}

export const adminBrandService = new AdminBrandService()
