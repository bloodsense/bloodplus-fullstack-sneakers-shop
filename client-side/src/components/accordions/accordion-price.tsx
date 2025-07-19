import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'

interface Props {
	className?: string
}

export const AccordionPrice: React.FC<Props> = ({ className }) => {
	return (
		<AccordionItem value="price">
			<AccordionTrigger>Цена</AccordionTrigger>
			<AccordionContent>
				<div className="flex flex-col gap-2 overflow-y-scroll h-40">Slider</div>
			</AccordionContent>
		</AccordionItem>
	)
}
