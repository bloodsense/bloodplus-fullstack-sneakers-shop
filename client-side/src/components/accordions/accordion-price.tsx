import React from 'react'
import { RangeSlider } from '../range-slider'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'

interface Props {
	className?: string
}

export const AccordionPrice: React.FC<Props> = ({ className }) => {
	const MIN_PRICE = 0
	const MAX_PRICE = 25000

	const [priceValues, setPriceValues] = React.useState<[number, number]>([
		MIN_PRICE,
		MAX_PRICE,
	])

	const handlePriceChange = (newValues: [number, number]) => {
		setPriceValues(newValues)
	}

	return (
		<AccordionItem value="price">
			<AccordionTrigger>Цена</AccordionTrigger>
			<AccordionContent>
				<div className="pt-2 px-2">
					<RangeSlider
						values={priceValues}
						onValueChange={handlePriceChange}
						min={MIN_PRICE}
						max={MAX_PRICE}
						step={50}
						minStepsBetweenThumbs={50}
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
