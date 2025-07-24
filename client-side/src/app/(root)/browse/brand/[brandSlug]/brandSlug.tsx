'use client'

import { BrowseSneakersList } from '@/components/browse-sneakers-list'
import { useParams } from 'next/navigation'

export const BrandSlug = () => {
	const params = useParams()

	const brandSlug = typeof params.brandSlug === 'string' ? params.brandSlug : ''

	return (
		<div>
			<BrowseSneakersList gender="all" brandSlug={brandSlug} gridCols={4} />
		</div>
	)
}
