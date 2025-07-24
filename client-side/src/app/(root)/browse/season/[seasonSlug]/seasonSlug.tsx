'use client'

import { BrowseSneakersList } from '@/components/browse-sneakers-list'
import { useParams } from 'next/navigation'

export const SeasonSlug = () => {
	const params = useParams()

	const seasonSlug =
		typeof params.seasonSlug === 'string' ? params.seasonSlug : ''

	return (
		<div>
			<BrowseSneakersList gender="all" seasonSlug={seasonSlug} gridCols={4}/>
		</div>
	)
}
