import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { useFilterColors } from '@/hooks/accordion-filters/useFilterColors'
import { Checkbox } from '../ui/checkbox'
import { FiltersListSkeleton } from '../skeletons/filters-list-skeleton'

interface Props {
	className?: string
	isEnabled: boolean
	selectedItems: string[]
	onItemChange: (colorId: string) => void
}

export const AccordionColor: React.FC<Props> = ({
	className,
	isEnabled,
	selectedItems,
	onItemChange,
}) => {
	const { colors, isLoading: isLoadingColors } = useFilterColors(isEnabled)

	return (
		<AccordionItem value="color">
			<AccordionTrigger>Цвет</AccordionTrigger>
			<AccordionContent>
				{isLoadingColors ? (
					<FiltersListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-35 text-foreground/80">
						{colors?.length ? (
							colors.map(color => (
								<label
									key={color.id}
									htmlFor={`color-${color.id}`}
									className="flex items-center justify-between gap-2 cursor-pointer" //
								>
									<div className="flex items-center gap-2">
										<Checkbox
											id={`color-${color.id}`}
											checked={selectedItems.includes(color.slug)}
											onCheckedChange={() => onItemChange(color.slug)}
										/>
										<span>{color.value}</span>
									</div>

									<span
										className="h-3 w-3 rounded-full border mr-4"
										style={{ backgroundColor: color.hex }}
										aria-hidden="true"
									/>
								</label>
							))
						) : (
							<p>Бренды не найдены</p>
						)}
					</div>
				)}
			</AccordionContent>
		</AccordionItem>
	)
}
