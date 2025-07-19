import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion'

interface Props {
	className?: string
}

export const AccordionGender: React.FC<Props> = ({ className }) => {
	return (
		<AccordionItem value="gender">
			<AccordionTrigger>Пол</AccordionTrigger>
			<AccordionContent>
				<div className="flex flex-col gap-2 overflow-y-scroll">
					<p>Мужской</p>
					<p>Женский</p>
					<p>Унисекс</p>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
