import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Container } from './container'
import { useFilterBrands } from '@/hooks/useFilterBrands'
import { useFilterSeasons } from '@/hooks/useFilterSeasons'
import { PUBLIC_URL } from '@/config/urls.constants'
import { IBrand } from '@/shared/types/brand.interface'
import { ISeason } from '@/shared/types/season.interface'
import { SheetButtonFilter } from './sheet-filters-button'

interface Props {
	className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
	const browseLinks = [
		{ id: 1, link: '/browse/men', category: 'Мужское' },
		{ id: 2, link: '/browse/women', category: 'Женское' },
	]

	const { brands, isLoading: isLoadingBrands } = useFilterBrands()
	const { seasons, isLoading: isLoadingSeasons } = useFilterSeasons()

	return (
		<div className="sticky top-[69px] z-20 border-b bg-background/60 backdrop-blur-xl">
			<Container>
				<div
					className={cn('flex justify-center items-center gap-10 ', className)}
				>
					{browseLinks.map(({ id, link, category }) => (
						<div
							key={id}
							className="flex items-center justify-center w-40 h-11"
						>
							<Link href={link} className="text-xs">
								<p>{category}</p>
							</Link>
						</div>
					))}
					<SheetButtonFilter<IBrand>
						text="Бренд"
						isLoading={isLoadingBrands}
						items={brands}
						link={brand => PUBLIC_URL.browse.brand(brand.slug)}
						getItemName={brand => brand.name}
						loadingMessage="Загрузка списка брендов"
						notFoundMessage="Список кроссовок по брендам не найден"
					/>
					<SheetButtonFilter<ISeason>
						text="Сезон"
						isLoading={isLoadingSeasons}
						items={seasons}
						link={season => PUBLIC_URL.browse.season(season.slug)}
						getItemName={season => season.name}
						loadingMessage="Загрузка списка сезонов"
						notFoundMessage="Список кроссовок по сезонам не найден"
					/>
				</div>
			</Container>
		</div>
	)
}
