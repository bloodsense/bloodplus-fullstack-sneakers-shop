'use client'

import type { ISneaker } from '@/shared/types/sneaker.interface'
import { CardFavoriteItem } from './card-favorite-item'

interface SearchResultListProps {
	sneakers: ISneaker[]
}

export const SearchResultList: React.FC<SearchResultListProps> = ({
	sneakers,
}) => {
	return (
		<ul className="mt-4 space-y-4">
			{sneakers.map(sneaker => (
				<CardFavoriteItem key={sneaker.id} sneaker={sneaker} />
			))}
		</ul>
	)
}
