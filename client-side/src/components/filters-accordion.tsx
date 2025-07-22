import { MAX_PRICE, MIN_PRICE } from '@/constants/filter-price-constants'
import { AccordionBrand } from './accordions/accordion-brand'
import { AccordionColor } from './accordions/accordion-color'
import { AccordionPrice } from './accordions/accordion-price'
import { AccordionSeason } from './accordions/accordion-season'
import { Accordion } from './ui/accordion'
import React from 'react'

interface Props {
	selectedBrands: string[]
	handleBrandChange: (brandSlug: string) => void
	selectedSeasons: string[]
	handleSeasonChange: (seasonSlug: string) => void
	selectedColors: string[]
	handleColorChange: (colorSlug: string) => void
	priceRange: [number, number]
	handlePriceChange: (values: [number, number]) => void
}

export const FiltersAccordion: React.FC<Props> = ({
	selectedBrands,
	handleBrandChange,
	selectedSeasons,
	handleSeasonChange,
	selectedColors,
	handleColorChange,
	priceRange,
	handlePriceChange,
}) => {
	const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(
		() => {
			const defaultOpen: string[] = []

			if (selectedBrands.length > 0) {
				defaultOpen.push('brand')
			}
			if (selectedSeasons.length > 0) {
				defaultOpen.push('season')
			}
			if (selectedColors.length > 0) {
				defaultOpen.push('color')
			}
			if (priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE) {
				defaultOpen.push('price')
			}

			return defaultOpen
		}
	)

	return (
		<Accordion
			type="multiple"
			value={openAccordionItems}
			onValueChange={setOpenAccordionItems}
			className="w-[320px]"
		>
			<AccordionBrand
				isEnabled={openAccordionItems.includes('brand')}
				selectedItems={selectedBrands}
				onItemChange={handleBrandChange}
			/>
			<AccordionSeason
				isEnabled={openAccordionItems.includes('season')}
				selectedItems={selectedSeasons}
				onItemChange={handleSeasonChange}
			/>
			<AccordionColor
				isEnabled={openAccordionItems.includes('color')}
				selectedItems={selectedColors}
				onItemChange={handleColorChange}
			/>
			<AccordionPrice values={priceRange} onPriceChange={handlePriceChange} />
		</Accordion>
	)
}
