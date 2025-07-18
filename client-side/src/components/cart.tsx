import { Button } from "./ui/button"

interface Props {
	className?: string
}

export const Cart: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Button>
				<p>Корзина</p>
			</Button>
		</div>
	)
}
