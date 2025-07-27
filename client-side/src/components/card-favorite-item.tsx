'use client'

import { PUBLIC_URL } from '@/config/urls.constants'
import type { ISneaker } from '@/shared/types/sneaker.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FavoriteToggleButton } from './favorite-toggle-button'
import { useProfile } from '@/hooks/useProfile'
import { useFavoriteStore } from '@/stores/favorite-store'
import { useFavoriteStatus } from '@/hooks/useFavorite'

interface CardFavoriteItemProps {
	sneaker: ISneaker
}

export const CardFavoriteItem: React.FC<CardFavoriteItemProps> = ({
	sneaker,
}) => {
	const { toggleFavorite, isPending } = useFavoriteStatus(sneaker.slug)

	const { profile } = useProfile()
	const { isFavorite: isLocalFavorite } = useFavoriteStore()

	const isCurrentlyFavorite = profile
		? profile.favorites.some(fav => fav.slug === sneaker.slug)
		: isLocalFavorite(sneaker.slug)

	const handleToggle = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		toggleFavorite()
	}

	return (
		<li className="bg-foreground/5 p-4 rounded-lg">
			<div className="flex items-center justify-between space-x-6">
				<Link
					href={PUBLIC_URL.browse.sneakersByBrand(
						sneaker.brand.slug,
						sneaker.slug
					)}
					className="flex flex-grow items-center space-x-6"
				>
					<div className="relative w-30 h-24 flex-shrink-0">
						<Image
							src={sneaker.images[0]}
							alt={sneaker.name}
							fill
							style={{ objectFit: 'cover' }}
							className="rounded-md"
						/>
					</div>
					<div className="flex flex-col">
						<h3 className="text-base font-medium">{sneaker.name}</h3>
						<p className="text-sm text-foreground/70">{sneaker.brand.name}</p>
						<p className="text-base pt-2">
							{sneaker.price.toLocaleString('ru-RU')} ₽
						</p>
					</div>
				</Link>

				<div className="flex-shrink-0 w-[220px]">
					<FavoriteToggleButton
						isFavorite={isCurrentlyFavorite}
						isLoading={isPending}
						onClick={handleToggle}
					/>
				</div>
			</div>
		</li>
	)
}
