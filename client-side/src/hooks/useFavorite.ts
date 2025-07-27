import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '@/services/user.service'
import { useProfile } from './useProfile'
import { useFavoriteStore } from '@/stores/favorite-store'
import type { IUser } from '@/shared/types/user.interface'
import type { ISneaker } from '@/shared/types/sneaker.interface'

export function useFavoriteStatus(sneakerSlug: string) {
	const queryClient = useQueryClient()
	const { profile } = useProfile()
	const { toggleFavorite: toggleLocalFavorite } = useFavoriteStore()

	const { mutate: toggleServerFavorite, isPending } = useMutation({
		mutationKey: ['toggle favorite', sneakerSlug],
		mutationFn: () => userService.addFavorites(sneakerSlug),

		onMutate: async () => {
			const profileQueryKey = ['profile']
			await queryClient.cancelQueries({ queryKey: profileQueryKey })
			const previousProfile = queryClient.getQueryData<IUser>(profileQueryKey)

			const wasFavorite =
				previousProfile?.favorites.some(fav => fav.slug === sneakerSlug) ??
				false

			if (previousProfile) {
				queryClient.setQueryData<IUser>(profileQueryKey, oldProfile => {
					if (!oldProfile) return undefined

					const newFavorites = wasFavorite
						? oldProfile.favorites.filter(fav => fav.slug !== sneakerSlug)
						: [...oldProfile.favorites, { slug: sneakerSlug } as ISneaker]
					return { ...oldProfile, favorites: newFavorites }
				})
			}

			return { previousProfile, wasFavorite }
		},

		onSuccess: (data, variables, context) => {
			toast.success(
				context.wasFavorite ? 'Удалено из избранного' : 'Добавлено в избранное'
			)
		},

		onError: (err, variables, context) => {
			if (context?.previousProfile) {
				queryClient.setQueryData(['profile'], context.previousProfile)
			}
			toast.error('Не удалось обновить избранное. Попробуйте снова')
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
	})

	const toggleFavorite = () => {
		if (profile) {
			toggleServerFavorite()
		} else {
			toggleLocalFavorite(sneakerSlug)
			const isNowFavorite = useFavoriteStore.getState().isFavorite(sneakerSlug)
			toast.success(
				isNowFavorite ? 'Добавлено в избранное' : 'Удалено из избранного'
			)
		}
	}

	return { toggleFavorite, isPending }
}
