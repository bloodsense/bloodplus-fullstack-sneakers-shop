import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { useFilterBrands } from '@/hooks/accordion-filters/useFilterBrands'
import { Checkbox } from '../ui/checkbox'
import {  FiltersListSkeleton } from '../skeletons/filters-list-skeleton'

interface Props {
	className?: string
	isEnabled: boolean
	selectedItems: string[]
	onItemChange: (brandId: string) => void
	isDisabled?: boolean
}

export const AccordionBrand: React.FC<Props> = ({
	className,
	isEnabled,
	selectedItems,
	onItemChange,
	isDisabled = false,
}) => {
	const { brands, isLoading: isLoadingBrands } = useFilterBrands(isEnabled)

	return (
		<AccordionItem value="brand" disabled={isDisabled}>
			<AccordionTrigger>Бренд</AccordionTrigger>
			<AccordionContent>
				{isLoadingBrands ? (
					<FiltersListSkeleton />
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
