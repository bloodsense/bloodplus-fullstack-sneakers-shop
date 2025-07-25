import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { sneakerService } from '@/services/sneaker.service'
import type { CarouselApi } from '@/components/ui/carousel'

export function useSneakerPage() {
	const params = useParams<{ brandSlug: string; sneakerSlug: string }>()
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	const {
		data: sneaker,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['sneaker', params.brandSlug, params.sneakerSlug],
		queryFn: () =>
			sneakerService.watchSneakerByBrand(params.brandSlug, params.sneakerSlug),
		enabled: !!params.brandSlug && !!params.sneakerSlug,
	})

	useEffect(() => {
		if (!api) return

		const onSelect = (api: CarouselApi) => {
			setCurrent(api.selectedScrollSnap() + 1)
		}

		api.on('select', onSelect)
		onSelect(api)

		return () => {
			api.off('select', onSelect)
		}
	}, [api])

	const handleThumbnailClick = (index: number) => {
		api?.scrollTo(index)
	}

	return {
		sneaker,
		isLoading,
		isError,
		setApi,
		current,
		handleThumbnailClick,
	}
}
