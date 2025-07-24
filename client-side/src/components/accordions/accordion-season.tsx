import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FilterListSkeleton } from '../filters-list-skeleton'
import { useFilterSeasons } from '@/hooks/accordion-filters/useFilterSeasons'
import { Checkbox } from '../ui/checkbox'

interface Props {
	className?: string
	isEnabled: boolean
	selectedItems: string[]
	onItemChange: (seasonId: string) => void
	isDisabled?: boolean
}

export const AccordionSeason: React.FC<Props> = ({
	className,
	isEnabled,
	selectedItems,
	onItemChange,
	isDisabled = false,
}) => {
	const { seasons, isLoading: isLoadingSeasons } = useFilterSeasons(isEnabled)

	return (
		<AccordionItem value="season" disabled={isDisabled}>
			<AccordionTrigger>Сезон</AccordionTrigger>
			<AccordionContent>
				{isLoadingSeasons ? (
					<FilterListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-35 text-foreground/80">
						{seasons?.length ? (
							seasons.map(season => (
								<label
									key={season.id}
									htmlFor={`season-${season.id}`}
									className="flex items-center gap-2 cursor-pointer" //
								>
									<Checkbox
										id={`season-${season.id}`}
										checked={selectedItems.includes(season.slug)}
										onCheckedChange={() => onItemChange(season.slug)}
									/>
									<span>{season.name}</span>
								</label>
							))
						) : (
							<p>Сезоны не найдены</p>
						)}
					</div>
				)}
			</AccordionContent>
		</AccordionItem>
	)
}
