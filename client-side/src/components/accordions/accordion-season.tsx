import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FilterListSkeleton } from '../filters-list-skeleton'
import { useFilterSeasons } from '@/hooks/filters/useFilterSeasons'

interface Props {
	className?: string
	isEnabled: boolean
}

export const AccordionSeason: React.FC<Props> = ({ className, isEnabled }) => {
	const { seasons, isLoading: isLoadingSeasons } = useFilterSeasons(isEnabled)

	return (
		<AccordionItem value="season">
			<AccordionTrigger>Сезон</AccordionTrigger>
			<AccordionContent>
				{isLoadingSeasons ? (
					<FilterListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-40">
						{seasons?.length ? (
							seasons.map(season => (
								<p key={season.id} className="hover:underline">
									{season.name}
								</p>
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
