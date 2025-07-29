'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Container } from './container'
import { PUBLIC_URL } from '@/config/urls.constants'
import { IBrand } from '@/shared/types/brand.interface'
import { ISeason } from '@/shared/types/season.interface'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { brandService } from '@/services/brand.service'
import { seasonService } from '@/services/season.service'
import { SheetSkeletonList } from './skeletons/sheet-skeleton-list'
import { SheetButtonFilter } from './buttons/sheet-filters-button'

interface Props {
	className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
	const browseLinks = [
		{ id: 1, link: '/browse/men', category: 'Мужчинам' },
		{ id: 2, link: '/browse/women', category: 'Женщинам' },
	]

	return (
		<div className="sticky top-[69px] z-10 border-b bg-background/60 backdrop-blur-xl">
			<Container>
				<div
					className={cn('flex justify-center items-center gap-10 ', className)}
				>
					{browseLinks.map(({ id, link, category }) => (
						<div
							key={id}
							className="flex items-center justify-center w-40 h-11"
						>
							<Link
								href={link}
								className="flex items-center text-xs gap-1 group"
							>
								<p>{category}</p>
								<CaretRightIcon
									className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
									aria-hidden="true"
								/>
							</Link>
						</div>
					))}
					<SheetButtonFilter<IBrand>
						queryKey={['brands']}
						queryFn={brandService.getAllBrands}
						text="Бренд"
						link={brand => PUBLIC_URL.browse.brand(brand.slug)}
						getItemName={brand => brand.name}
						skeletonComponent={<SheetSkeletonList />}
						notFoundMessage="Список кроссовок по брендам не найден"
					/>
					<SheetButtonFilter<ISeason>
						queryKey={['seasons']}
						queryFn={seasonService.getAllSeasons}
						text="Сезон"
						link={season => PUBLIC_URL.browse.season(season.slug)}
						getItemName={season => season.name}
						skeletonComponent={<SheetSkeletonList />}
						notFoundMessage="Список кроссовок по сезонам не найден"
					/>
				</div>
			</Container>
		</div>
	)
}
