import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FilterListSkeleton } from '../filters-list-skeleton'
import { useFilterColors } from '@/hooks/accordion-filters/useFilterColors'
import { Checkbox } from '../ui/checkbox'

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
					<FilterListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-27">
						{colors?.length ? (
							colors.map(color => (
								<label
									key={color.id}
									htmlFor={`brand-${color.id}`}
									className="flex items-center gap-2 cursor-pointer" //
								>
									<Checkbox
										id={`brand-${color.id}`}
										checked={selectedItems.includes(color.slug)}
										onCheckedChange={() => onItemChange(color.slug)}
									/>
									<span>{color.value}</span>
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
