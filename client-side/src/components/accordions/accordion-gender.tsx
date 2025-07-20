import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'
import { Checkbox } from '../ui/checkbox'

interface Props {
	className?: string
	selectedItems: string[]
	onItemChange: (gender: string) => void
}

export const AccordionGender: React.FC<Props> = ({
	className,
	selectedItems,
	onItemChange,
}) => {
	return (
		<AccordionItem value="gender">
			<AccordionTrigger>Пол</AccordionTrigger>
			<AccordionContent>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="gender-men"
						className="flex items-center gap-2 cursor-pointer"
					>
						<Checkbox
							id="gender-men"
							onCheckedChange={() => onItemChange('men')}
							checked={selectedItems.includes('men')}
						/>
						<span>Мужской</span>
					</label>
					<label
						htmlFor="gender-women"
						className="flex items-center gap-2 cursor-pointer"
					>
						<Checkbox
							id="gender-women"
							checked={selectedItems.includes('women')}
							onCheckedChange={() => onItemChange('women')}
						/>
						<span>Женский</span>
					</label>
					<label
						htmlFor="gender-unisex"
						className="flex items-center gap-2 cursor-pointer"
					>
						<Checkbox
							id="gender-unisex"
							checked={selectedItems.includes('unisex')}
							onCheckedChange={() => onItemChange('unisex')}
						/>
						<span>Унисекс</span>
					</label>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
