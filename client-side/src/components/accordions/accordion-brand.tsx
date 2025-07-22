import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { FilterListSkeleton } from '../filters-list-skeleton'
import { useFilterBrands } from '@/hooks/accordion-filters/useFilterBrands'
import { Checkbox } from '../ui/checkbox'

interface Props {
	className?: string
	isEnabled: boolean
	selectedItems: string[]
	onItemChange: (brandId: string) => void
}

export const AccordionBrand: React.FC<Props> = ({
	className,
	isEnabled,
	selectedItems,
	onItemChange,
}) => {
	const { brands, isLoading: isLoadingBrands } = useFilterBrands(isEnabled)

	return (
		<AccordionItem value="brand">
			<AccordionTrigger>Бренд</AccordionTrigger>
			<AccordionContent>
				{isLoadingBrands ? (
					<FilterListSkeleton />
				) : (
					<div className="flex flex-col gap-2 overflow-y-scroll h-35 text-foreground/80">
						{brands?.length ? (
							brands.map(brand => (
								<label
									key={brand.id}
									htmlFor={`brand-${brand.id}`}
									className="flex items-center gap-2 cursor-pointer" //
								>
									<Checkbox
										id={`brand-${brand.id}`}
										checked={selectedItems.includes(brand.slug)}
										onCheckedChange={() => onItemChange(brand.slug)}
									/>
									<span>{brand.name}</span>
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
