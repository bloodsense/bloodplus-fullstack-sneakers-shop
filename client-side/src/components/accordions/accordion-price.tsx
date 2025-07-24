import React from 'react'
import { RangeSlider } from '../range-slider'
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { useDebouncedCallback } from '@/hooks/debounce/useDebouncedCallback'
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
	const [debouncedOnPriceChange, cancelDebounce] = useDebouncedCallback(
		onPriceChange,
		400
	)

	React.useEffect(() => {
		setLocalValues(values)
		cancelDebounce()
	}, [values, cancelDebounce])

	const handleSliderChange = (newValues: [number, number]) => {
		setLocalValues(newValues)
		debouncedOnPriceChange(newValues)
	}

	return (
		<AccordionItem value="price">
			<AccordionTrigger>Цена</AccordionTrigger>
			<AccordionContent>
				<div className="pt-2 px-2">
					<RangeSlider
						values={localValues}
						onValueChange={handleSliderChange}
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
