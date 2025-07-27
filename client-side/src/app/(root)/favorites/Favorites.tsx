'use client'

import { Container } from '@/components/container'
import { useIsClient } from '@/hooks/useIsClient'
import { useProfile } from '@/hooks/useProfile'
import { CardFavoriteItem } from '@/components/card-favorite-item'
import { FavoritesListSkeleton } from '@/components/skeletons/favorites-list-skeleton'
import { useFavoriteStore } from '@/stores/favorite-store'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query' 
import { sneakerService } from '@/services/sneaker.service'
import { PUBLIC_URL } from '@/config/urls.constants'

export const Favorites = () => {
	const isClient = useIsClient()
	const { profile, isLoading: isProfileLoading } = useProfile()
	const localFavoriteSlugs = useFavoriteStore(state => state.favoriteSlugs)

	const { data: localFavoritesData, isLoading: isLocalFavoritesLoading } =
		useQuery({
			queryKey: ['local-favorites', ...localFavoriteSlugs],
			queryFn: () => sneakerService.getBySlugs(localFavoriteSlugs),
			enabled: isClient && !profile && localFavoriteSlugs.length > 0,
		})

	if (!isClient || isProfileLoading || isLocalFavoritesLoading) {
		return (
			<Container className="pt-10 mb-10">
				<FavoritesListSkeleton />
			</Container>
		)
	}

	if (profile) {
		const favoritesList =
			profile.favorites?.filter(sneaker => sneaker && sneaker.brand) || []
		const isListEmpty = favoritesList.length === 0

		return (
			<Container className="pt-10 mb-10">
				{isListEmpty ? (
					<p className="text-center text-foreground/50 bg-foreground/5 py-87 rounded-lg">
						Вы пока ничего не добавили в избранное
					</p>
				) : (
					<ul className="mt-4 space-y-4">
						{favoritesList.map(sneaker => (
							<CardFavoriteItem key={sneaker.id} sneaker={sneaker} />
						))}
					</ul>
				)}
			</Container>
		)
	}

	return (
		<Container className="pt-14 mb-10">
			<div>
				{(localFavoritesData?.length ?? 0) === 0 ? (
					<div className="bg-foreground/5 py-81 rounded-lg">
						<p className="text-center text-foreground/50 text-lg mb-1">
							Вы пока ничего не добавили в избранное.
						</p>
						<p className="text-center text-foreground/50">
							Для синхронизации избранного,{' '}
							<Link
								href={PUBLIC_URL.auth()}
								className="text-foreground/50 hover:underline"
							>
								нажмите сюда
							</Link>
							, чтобы войти или зарегистрироваться в системе
						</p>
					</div>
				) : (
					<div>
						<ul className="space-y-4">
							{localFavoritesData?.map(sneaker => (
								<CardFavoriteItem key={sneaker.id} sneaker={sneaker} />
							))}
						</ul>
						<p className="text-center text-foreground/50 pt-10">
							Это сохранено только в Вашем браузере, при изменении или удалении
							локального хранилища браузера, то, что Вы сюда добавили - будет
							утеряно.
						</p>
						<p className="text-center text-foreground/50">
							Для того, чтобы синхронизировать эти данные, и иметь к ним доступ
							в будущем, {' '}
							<Link
								href={PUBLIC_URL.auth()}
								className="text-foreground/50 hover:underline"
							>
								авторизируйтесь или зарегистрируйтесь {' '}
							</Link>
							в системе
						</p>
					</div>
				)}
			</div>
		</Container>
	)
}
