import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface FavoriteState {
	favoriteSlugs: string[]
	toggleFavorite: (slug: string) => void
	isFavorite: (slug: string) => boolean
	clearFavorites: () => void
}

export const useFavoriteStore = create<FavoriteState>()(
	persist(
		(set, get) => ({
			favoriteSlugs: [],
			toggleFavorite: slug => {
				const { favoriteSlugs } = get()
				const isAlreadyFavorite = favoriteSlugs.includes(slug)

				const newFavoriteSlugs = isAlreadyFavorite
					? favoriteSlugs.filter(s => s !== slug)
					: [...favoriteSlugs, slug]

				set({ favoriteSlugs: newFavoriteSlugs })
			},
			isFavorite: slug => get().favoriteSlugs.includes(slug),
			clearFavorites: () => set({ favoriteSlugs: [] }),
		}),
		{
			name: 'favorite-sneakers-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
)
