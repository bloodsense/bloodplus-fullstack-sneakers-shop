import { useFilterBrands } from '@/hooks/filters/useFilterBrands'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion'
import { useFilterSeasons } from '@/hooks/filters/useFilterSeasons'
import { useFilterColors } from '@/hooks/filters/useFilterColors'
import React from 'react'
import { FilterListSkeleton } from './filters-list-skeleton'

interface Props {
	className?: string
}

export const FiltersAccordion: React.FC<Props> = ({ className }) => {
	const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(
		[]
	)

	const { brands, isLoading: isLoadingBrands } = useFilterBrands(
		openAccordionItems.includes('brand')
	)
	const { seasons, isLoading: isLoadingSeasons } = useFilterSeasons(
		openAccordionItems.includes('season')
	)
	const { colors, isLoading: isLoadingColors } = useFilterColors(
		openAccordionItems.includes('color')
	)

	const [priceRange, setPriceRange] = React.useState<[number, number]>([20, 80])

	const handleRangeChange = (values: number[]) => {
		setPriceRange(values as [number, number])
	}

	return (
		<Accordion
			type="multiple"
			value={openAccordionItems}
			onValueChange={setOpenAccordionItems}
			className="w-[260px] mr-10"
		>
			<AccordionItem value="brand">
				<AccordionTrigger>Бренд</AccordionTrigger>
				<AccordionContent>
					{isLoadingBrands ? (
						<FilterListSkeleton />
					) : (
						<div className="flex flex-col gap-2 overflow-y-scroll h-40">
							{brands?.length ? (
								brands.map(brand => (
									<p key={brand.id} className="hover:underline">
										{brand.name}
									</p>
								))
							) : (
								<p>Бренды не найдены</p>
							)}
						</div>
					)}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="season">
				<AccordionTrigger>Сезон</AccordionTrigger>
				<AccordionContent>
					{isLoadingSeasons ? (
						<FilterListSkeleton />
					) : (
						<div className="flex flex-col gap-2 overflow-y-scroll h-40">
							{seasons?.length ? (
								seasons.map(season => (
									<p key={season.id} className="hover:underline">
										{season.name}
									</p>
								))
							) : (
								<p>Сезоны не найдены</p>
							)}
						</div>
					)}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="gender">
				<AccordionTrigger>Пол</AccordionTrigger>
				<AccordionContent>
					<div className="flex flex-col gap-2 overflow-y-scroll">
						<p>Мужской</p>
						<p>Женский</p>
						<p>Унисекс</p>
					</div>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="color">
				<AccordionTrigger>Цвет</AccordionTrigger>
				<AccordionContent>
					{isLoadingColors ? (
						<FilterListSkeleton />
					) : (
						<div className="flex flex-col gap-2">
							{colors?.length ? (
								colors.map(color => (
									<p key={color.id} className="hover:underline">
										{color.value}
									</p>
								))
							) : (
								<p>Цвета не найдены</p>
							)}
						</div>
					)}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="price">
				<AccordionTrigger>Цена</AccordionTrigger>
				<AccordionContent>
					<div className="flex flex-col gap-2 overflow-y-scroll h-40">
						Slider
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
