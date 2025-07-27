'use client'

import { Container } from '@/components/container'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { useIsClient } from '@/hooks/useIsClient'
import { useProfile } from '@/hooks/useProfile'
import { CardFavoriteItem } from '@/components/card-favorite-item'
import { FavoritesListSkeleton } from '@/components/skeletons/favorites-list-skeleton'

export const Favorites = () => {
	useAuthRedirect()
	const { profile, isLoading } = useProfile()
	const isClient = useIsClient()

	const showSkeletons = !isClient || isLoading

	const favoritesList =
		profile?.favorites?.filter(sneaker => sneaker && sneaker.brand) || []

	const isListEmpty = !showSkeletons && favoritesList.length === 0

	return (
		<Container className="pt-10 mb-10">
			<div>
				{showSkeletons ? (
					<FavoritesListSkeleton />
				) : isListEmpty ? (
					<p className="text-center text-foreground/50">
						Вы пока ничего не добавили в избранное
					</p>
				) : (
					<ul className="mt-4 space-y-4">
						{favoritesList.map(sneaker => (
							<CardFavoriteItem key={sneaker.id} sneaker={sneaker} />
						))}
					</ul>
				)}
			</div>
		</Container>
	)
}
