import { useFilters } from '@/hooks/filters/useClientFilters'
import { AccordionBrand } from './accordions/accordion-brand'
import { AccordionColor } from './accordions/accordion-color'
import { AccordionGender } from './accordions/accordion-gender'
import { AccordionPrice } from './accordions/accordion-price'
import { AccordionSeason } from './accordions/accordion-season'
import { Accordion } from './ui/accordion'
import React from 'react'

interface Props {
	className?: string
}

export const FiltersAccordion: React.FC<Props> = ({ className }) => {
	const [openAccordionItems, setOpenAccordionItems] = React.useState<string[]>(
		[]
	)

	const isBrandsAccordionOpen = openAccordionItems.includes('brand')
	const isSeasonsAccordionOpen = openAccordionItems.includes('season')
	const isColorsAccordionOpen = openAccordionItems.includes('color')

	const {
		selectedBrands,
		selectedSeasons,
		selectedColors,
		selectedGenders,
		handleBrandChange,
		handleSeasonChange,
		handleColorChange,
		handleGenderChange,
	} = useFilters()

	return (
		<Accordion
			type="multiple"
			value={openAccordionItems}
			onValueChange={setOpenAccordionItems}
			className="w-[260px] mr-10"
		>
			<AccordionBrand
				isEnabled={isBrandsAccordionOpen}
				selectedItems={selectedBrands}
				onItemChange={handleBrandChange}
			/>
			<AccordionSeason
				isEnabled={isSeasonsAccordionOpen}
				selectedItems={selectedSeasons}
				onItemChange={handleSeasonChange}
			/>
			<AccordionColor
				isEnabled={isColorsAccordionOpen}
				selectedItems={selectedColors}
				onItemChange={handleColorChange}
			/>
			<AccordionGender
				selectedItems={selectedGenders}
				onItemChange={handleGenderChange}
			/>
			<AccordionPrice />
		</Accordion>
	)
}
