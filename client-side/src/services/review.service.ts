import { axiosDefault, axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'
import { IReview, IReviewCreate, IReviewUpdate } from '@/shared/types/review.interface'

class ReviewService {
	async getReviewsBySneakerSlug(sneakerSlug: string) {
		const { data: getReviewsBySneakerSlug } = await axiosDefault<IReview[]>({
			url: API_URL.reviews.getBySneakerSlug(sneakerSlug),
			method: 'GET',
		})

		return getReviewsBySneakerSlug
	}

	async getReviewById(id: string) {
		const { data: getReviewById } = await axiosDefault<IReview>({
			url: API_URL.reviews.getById(id),
			method: 'GET',
		})

		return getReviewById
	}

	async createReview(data: IReviewCreate, sneakerId: string) {
		const { data: createReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews.create(sneakerId),
			method: 'POST',
			data,
		})

		return createReview
	}

	async updateReview(data: IReviewUpdate, id: string) {
		const { data: updateReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews.update(id),
			method: 'PUT',
			data,
		})

		return updateReview
	}

	async deleteReview(id: string) {
		const { data: deleteReview } = await axiosWithAuth<IReview>({
			url: API_URL.reviews.delete(id),
			method: 'DELETE',
		})

		return deleteReview
	}
}

export const reviewService = new ReviewService()
