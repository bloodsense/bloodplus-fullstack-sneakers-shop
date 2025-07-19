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

	return (
		<Accordion
			type="multiple"
			value={openAccordionItems}
			onValueChange={setOpenAccordionItems}
			className="w-[260px] mr-10"
		>
			<AccordionBrand isEnabled={isBrandsAccordionOpen} />
			<AccordionSeason isEnabled={isSeasonsAccordionOpen} />
			<AccordionColor isEnabled={isColorsAccordionOpen} />
			<AccordionGender />
			<AccordionPrice />
		</Accordion>
	)
}
