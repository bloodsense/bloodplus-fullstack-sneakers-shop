import { format, parseISO } from 'date-fns'

export function formatPriceWithK(price: number): string {
	if (price >= 1000) {
		const valueInK = price / 1000
		const roundedValue = Math.round(valueInK * 10) / 10
		return `${roundedValue}k`
	}
	return price.toString()
}

export function formatFullPrice(price: number): string {
	return new Intl.NumberFormat('ru-RU').format(price)
}

type OrderStatus = 'PENDING' | 'SUCCESS' | 'CANCELLED'

const orderStatusMap: Record<OrderStatus, string> = {
	PENDING: 'В ожидании',
	SUCCESS: 'Выполнен',
	CANCELLED: 'Отменен',
}

export const getRussianOrderStatus = (status: OrderStatus | string): string => {
	return orderStatusMap[status as OrderStatus] || status
}

const statusColorMap = {
	PENDING: 'text-yellow-600',
	SUCCESS: 'text-green-700',
	CANCELLED: 'text-red-700',
}

export const getOrderStatusStyles = (status: string): string => {
	return statusColorMap[status as keyof typeof statusColorMap]
}

export const formatDateTime = (
	dateString: string | undefined | null
): string => {
	if (!dateString) {
		return ''
	}

	try {
		const date = parseISO(dateString)
		return format(date, 'dd.MM.yyyy в HH:mm')
	} catch (error) {
		console.error('Передана неверная строка:', dateString)
		return dateString
	}
}
