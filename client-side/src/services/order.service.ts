import {
	IOrderCreateData,
	IPaymentResponse,
} from '../shared/types/order.interface'
import { axiosWithAuth } from '@/api/api.interceptors'
import { API_URL } from '@/config/api.constants'

class OrderService {
	async createOrder(data: IOrderCreateData) {
		const { data: paymentResponse } = await axiosWithAuth<IPaymentResponse>({
			url: API_URL.orders.create(),
			method: 'POST',
			data,
		})
	}
}

export const orderService = new OrderService()
