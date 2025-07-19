import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FilterListSkeleton } from '../filters-list-skeleton'
import { useFilterColors } from '@/hooks/filters/useFilterColors'

interface Props {
	className?: string
	isEnabled: boolean
}

export const AccordionColor: React.FC<Props> = ({ className, isEnabled }) => {
	const { colors, isLoading: isLoadingColors } = useFilterColors(isEnabled)

	return (
		<AccordionItem value="color">
			<AccordionTrigger>Цвет</AccordionTrigger>
			<AccordionContent>
				{isLoadingColors ? (
					<FilterListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-40">
						{colors?.length ? (
							colors.map(color => (
								<p key={color.id} className="hover:underline">
									{color.value}
								</p>
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
