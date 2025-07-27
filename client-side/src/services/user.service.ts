import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { IUser } from '@/shared/types/user.interface'

class UserService {
	async getProfile() {
		const { data: getProfile } = await axiosWithAuth<IUser>({
			url: API_URL.users.profile(),
			method: 'GET',
		})

		return getProfile
	}

	async addFavorites(sneakerSlug: string) {
		const { data: addFavorites } = await axiosWithAuth<IUser>({
			url: API_URL.users.favorites(sneakerSlug),
			method: 'PATCH',
		})

		return addFavorites
	}

	async syncFavorites(sneakerSlugs: string[]) {
		return axiosWithAuth({
			url: API_URL.users.favoritesSync(),
			method: 'POST',
			data: { sneakerSlugs },
		})
	}
}

export const userService = new UserService()
