'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'

type RangeSliderProps = Omit<
	React.ComponentProps<typeof Slider>,
	'value' | 'onValueChange'
> & {
	values: [number, number]
	onValueChange: (values: [number, number]) => void
	min?: number
	max?: number
}

export function RangeSlider({
	className,
	values,
	onValueChange,
	min = 0,
	max = 25000,
	...props
}: RangeSliderProps) {
	const calculatePosition = (value: number) => {
		const range = max - min
		if (range === 0) return 0
		return ((value - min) / range) * 100
	}

	const position1 = calculatePosition(values[0])
	const position2 = calculatePosition(values[1])
	const positionDifference = position2 - position1

	const MERGE_THRESHOLD = 20

	const showMergedLabel = positionDifference < MERGE_THRESHOLD

	const getLabelTransform = (position: number) => {
		if (position < 5) return 'translateX(0%)'
		if (position > 95) return 'translateX(-100%)'
		return 'translateX(-50%)'
	}

	return (
		<div className={cn('relative w-full pb-8', className)}>
			<Slider
				value={values}
				onValueChange={newValues =>
					onValueChange(newValues as [number, number])
				}
				min={min}
				max={max}
				{...props}
			/>

			<div className="relative h-4 pt-2">
				{showMergedLabel ? (
					<div
						className="absolute text-sm text-muted-foreground text-center whitespace-nowrap"
						style={{
							left: `${(position1 + position2) / 2}%`,
							transform: 'translateX(-50%)',
						}}
					>
						{values[0]} - {values[1]}
					</div>
				) : (
					<>
						<div
							className="absolute text-sm text-muted-foreground text-center"
							style={{
								left: `${position1}%`,
								transform: getLabelTransform(position1),
							}}
						>
							{values[0]}
						</div>
						<div
							className="absolute text-sm text-muted-foreground text-center"
							style={{
								left: `${position2}%`,
								transform: getLabelTransform(position2),
							}}
						>
							{values[1]}
						</div>
					</>
				)}
			</div>
		</div>
	)
}
