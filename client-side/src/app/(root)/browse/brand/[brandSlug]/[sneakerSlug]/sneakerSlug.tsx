'use client'

import { Container } from '@/components/container'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { SneakerImageSkeleton } from '@/components/skeletons/sneaker-image-skeleton'
import { SneakerPurchaseInfoSkeleton } from '@/components/skeletons/sneaker-purchase-info-skeleton'
import { SneakerDetailsSkeleton } from '@/components/skeletons/sneaker-details-skeleton'
import { useSneakerPage } from '@/hooks/usePageSneaker'
import { SneakerDetails } from '@/components/sneaker-details'
import { SneakerPurchaseInfo } from '@/components/sneaker-purchase-info'
import { SneakerImages } from '@/components/sneaker-images'
import { useProfile } from '@/hooks/useProfile'
import { SneakerReviews } from '@/components/reviews/sneaker-reviews'
import { SimilarSneakers } from '@/components/similar-sneakers'

export const SneakerSlug = () => {
	const {
		sneaker,
		isLoading: isSneakerLoading,
		isError,
		setApi,
		current,
		handleThumbnailClick,
	} = useSneakerPage()

	const { profile, isLoading: isProfileLoading } = useProfile()

	if (isSneakerLoading || isProfileLoading) {
		return (
			<Container className="pt-7.5">
				<Skeleton className="h-5 w-1/3 " />
				<div className="pt-4 grid grid-cols-1 lg:grid-cols-2 items-start gap-x-10 gap-y-10 mb-16">
					<SneakerImageSkeleton />
					<SneakerPurchaseInfoSkeleton />
				</div>
				<SneakerDetailsSkeleton />
			</Container>
		)
	}

	if (isError)
		return (
			<Container className="pt-7.5">
				Ошибка при загрузке данных о кроссовке
			</Container>
		)

	if (!sneaker)
		return (
			<Container className="pt-7.5">
				Информация о кроссовках не найдена
			</Container>
		)

	const isFavorite =
		profile?.favorites.some(fav => fav.id === sneaker.id) ?? false

	return (
		<Container className="pt-7.5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Link href="/">Главная</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<Link href={`/browse/brand/${sneaker.brand.slug}`}>
							{sneaker.brand.name}
						</Link>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{sneaker.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="pt-4 grid grid-cols-1 lg:grid-cols-2 items-start gap-x-10 gap-y-10 mb-8">
				<SneakerImages
					images={sneaker.images}
					name={sneaker.name}
					setApi={setApi}
				/>
				<SneakerPurchaseInfo
					sneaker={sneaker}
					current={current}
					onThumbnailClick={handleThumbnailClick}
				/>
			</div>

			<SneakerDetails sneaker={sneaker} />
			<SneakerReviews sneaker={sneaker} profile={profile} />
			<SimilarSneakers currentSneakerSlug={sneaker.slug} />
		</Container>
	)
}
