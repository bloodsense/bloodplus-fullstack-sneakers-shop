import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FilterListSkeleton } from '../filters-list-skeleton'
import { useFilterBrands } from '@/hooks/filters/useFilterBrands'
import { Checkbox } from '../ui/checkbox'


interface Props {
	className?: string
	isEnabled: boolean
}

export const AccordionBrand: React.FC<Props> = ({ className, isEnabled }) => {
	const { brands, isLoading: isLoadingBrands } = useFilterBrands(isEnabled)

	return (
		<AccordionItem value="brand">
			<AccordionTrigger>Бренд</AccordionTrigger>
			<AccordionContent>
				{isLoadingBrands ? (
					<FilterListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-40">
						{brands?.length ? (
							brands.map(brand => (
								<p key={brand.id} className="hover:underline">
									{brand.name}
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
