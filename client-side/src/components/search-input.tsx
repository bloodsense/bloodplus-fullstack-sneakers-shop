import { Input } from './ui/form/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	return (
		<div className="flex mr-10">
			<Input placeholder="Поиск по сайту" className="w-156 rounded-r-none" />
			<Button variant="outline" className="border-l-0 rounded-l-none bg-foreground/15 hover:bg-foreground/18">
				<Search className="text-white" />
			</Button>
		</div>
	)
}
