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
