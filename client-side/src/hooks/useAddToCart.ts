import { useState, useMemo } from 'react'
import { useCartStore, CartItem } from '@/stores/cart-store'
import type { ISneaker } from '@/shared/types/sneaker.interface'
import type { ISneakerSizeStock } from '@/shared/types/sneaker-size-stock.interface'

export const useAddToCart = (
	sneaker: ISneaker,
	selectedStock: ISneakerSizeStock | null
) => {
	const [isAdding, setIsAdding] = useState(false)
	const { addItem, items } = useCartStore()

	const handleAddToCart = () => {
		if (!selectedStock) return
		setIsAdding(true)
		setTimeout(() => {
			const itemToAdd: CartItem = {
				...sneaker,
				selectedSize: `${selectedStock.size.type} ${selectedStock.size.value}`,
				sizeId: selectedStock.sizeId,
			}
			addItem(itemToAdd)
			setIsAdding(false)
		}, 300)
	}

	const isAlreadyInCart = useMemo(() => {
		if (!selectedStock) return false
		return items.some(
			item => item.id === sneaker.id && item.sizeId === selectedStock.sizeId
		)
	}, [items, sneaker.id, selectedStock])

	return { handleAddToCart, isAdding, isAlreadyInCart }
}
