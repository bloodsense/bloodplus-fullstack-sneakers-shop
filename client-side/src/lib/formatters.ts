export function formatPriceWithK(price: number): string {
	if (price >= 1000) {
		const valueInK = price / 1000
		const roundedValue = Math.round(valueInK * 10) / 10
		return `${roundedValue}К`
	}
	return price.toString()
}
