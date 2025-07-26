import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ISneaker } from '@/shared/types/sneaker.interface'

export interface CartItem extends ISneaker {
	selectedSize: string
	sizeId: string
}

export interface CartItem extends ISneaker {
	selectedSize: string
}

interface CartState {
	items: CartItem[]
	addItem: (item: CartItem) => void
	removeItem: (sneakerId: string, sizeId: string) => void
	clearCart: () => void
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			addItem: (item: CartItem) => {
				const currentItems = get().items
				const existingItem = currentItems.find(
					i => i.id === item.id && i.sizeId === item.sizeId
				)

				if (!existingItem) {
					set({ items: [...currentItems, item] })
					console.log('Товар добавлен в корзину:', item)
				} else {
					console.log('Этот товар с таким размером уже в корзине')
				}
			},
			removeItem: (sneakerId: string, size: string) => {
				set({
					items: get().items.filter(
						item => !(item.id === sneakerId && item.selectedSize === size)
					),
				})
			},
			clearCart: () => set({ items: [] }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
