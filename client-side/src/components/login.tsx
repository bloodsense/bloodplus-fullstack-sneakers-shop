import Link from 'next/link'
import { Button } from './ui/button'

interface Props {
	className?: string
}

export const Login: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Button variant="outline">
				<Link href="/">Войти</Link>
			</Button>
		</div>
	)
}
