import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { userService } from '@/services/user.service'
import type { IUser } from '@/shared/types/user.interface'
import type { ISneaker } from '@/shared/types/sneaker.interface'

export function useFavoriteStatus(sneakerSlug: string) {
	const queryClient = useQueryClient()

	const { mutate: toggleFavorite, isPending } = useMutation({
		mutationKey: ['toggle favorite', sneakerSlug],
		mutationFn: () => userService.addFavorites(sneakerSlug),

		onMutate: async () => {
			const profileQueryKey = ['profile']
			await queryClient.cancelQueries({ queryKey: profileQueryKey })

			const previousProfile = queryClient.getQueryData<IUser>(profileQueryKey)

			queryClient.setQueryData<IUser>(profileQueryKey, oldProfile => {
				if (!oldProfile) return undefined

				const isAlreadyFavorite = oldProfile.favorites.some(
					fav => fav.slug === sneakerSlug
				)

				let newFavorites: ISneaker[]
				if (isAlreadyFavorite) {
					newFavorites = oldProfile.favorites.filter(
						fav => fav.slug !== sneakerSlug
					)
				} else {
					newFavorites = oldProfile.favorites.filter(
						fav => fav.slug !== sneakerSlug
					)
				}

				return {
					...oldProfile,
					favorites: newFavorites,
				}
			})

			return { previousProfile }
		},
		onError: (err, variables, context) => {
			if (context?.previousProfile) {
				queryClient.setQueryData(['profile'], context.previousProfile)
			}
			toast.error('Не удалось обновить избранное')
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		},
	})

	return { toggleFavorite, isPending }
}
