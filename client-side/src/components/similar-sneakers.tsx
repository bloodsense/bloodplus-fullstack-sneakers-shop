'use client'

import { FC } from 'react'
import { useSimilarSneakers } from '@/hooks/useSimilarSneakers'
import { SneakersGrid } from './sneakers-grid'
import { SneakerCard } from './sneaker-card'
import { BrowseCardSkeleton } from './skeletons/browse-card-skeleton'

interface ISimilarSneakersProps {
	currentSneakerSlug: string
}

export const SimilarSneakers: FC<ISimilarSneakersProps> = ({
	currentSneakerSlug,
}) => {
	const { similarSneakers, isLoading, isError } =
		useSimilarSneakers(currentSneakerSlug)

	if (isError || (!isLoading && !similarSneakers?.length)) {
		return null
	}

	return (
		<div className="mt-16 mb-8 bg-foreground/5 rounded-lg p-5">
			<h2 className="text-xl font-semibold mb-6">Может быть интересно</h2>

			<SneakersGrid>
				{isLoading
					? Array.from({ length: 5 }).map((_, index) => (
							<BrowseCardSkeleton key={index} />
					  ))
					: similarSneakers?.map(sneaker => (
							<SneakerCard key={sneaker.id} sneaker={sneaker} />
					  ))}
			</SneakersGrid>
		</div>
	)
}
