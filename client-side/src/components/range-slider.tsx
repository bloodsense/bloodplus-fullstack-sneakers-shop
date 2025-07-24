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

const PriceLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div className="flex items-center">
		<span>{children}</span>
		<span className="ml-1">₽</span>
	</div>
)

export function RangeSlider({
	className,
	values,
	onValueChange,
	min = 0,
	max = 99999,
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

	return (
		<div className={cn('relative w-full', className)}>
			<Slider
				className="cursor-pointer"
				value={values}
				onValueChange={newValues =>
					onValueChange(newValues as [number, number])
				}
				min={min}
				max={max}
				{...props}
			/>

			<div className="relative mt-4 h-5">
				{showMergedLabel ? (
					<div
						className="absolute text-sm text-muted-foreground whitespace-nowrap"
						style={{
							left: `${(position1 + position2) / 2}%`,
							transform: 'translateX(-50%)',
						}}
					>
						<PriceLabel>
							{values[0]} - {values[1]}
						</PriceLabel>
					</div>
				) : (
					<>
						<div
							className="absolute text-sm text-muted-foreground whitespace-nowrap"
							style={{
								left: `${position1}%`,
								transform: `translateX(-${position1}%)`,
							}}
						>
							<PriceLabel>{values[0]}</PriceLabel>
						</div>
						<div
							className="absolute text-sm text-muted-foreground whitespace-nowrap"
							style={{
								left: `${position2}%`,
								transform: `translateX(-${position2}%)`,
							}}
						>
							<PriceLabel>{values[1]}</PriceLabel>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
