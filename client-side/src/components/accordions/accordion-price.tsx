import React from 'react'
import { RangeSlider } from '../range-slider'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { useDebounce } from '@/hooks/useDebounce'
import { MAX_PRICE, MIN_PRICE } from '@/constants/filter-price-constants'

interface Props {
	className?: string
	values: [number, number]
	onPriceChange: (newValues: [number, number]) => void
}

export const AccordionPrice: React.FC<Props> = ({
	className,
	values,
	onPriceChange,
}) => {
	const [localValues, setLocalValues] = React.useState<[number, number]>(values)

	const debouncedValues = useDebounce(localValues, 400)

	React.useEffect(() => {
		setLocalValues(values)
	}, [values])

	React.useEffect(() => {
		if (debouncedValues[0] !== values[0] || debouncedValues[1] !== values[1]) {
			onPriceChange(debouncedValues)
		}
	}, [debouncedValues, onPriceChange])

	return (
		<AccordionItem value="price">
			<AccordionTrigger>Цена</AccordionTrigger>
			<AccordionContent>
				<div className="pt-2 px-2">
					<RangeSlider
						values={localValues}
						onValueChange={setLocalValues}
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
