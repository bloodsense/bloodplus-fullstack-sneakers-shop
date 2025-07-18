import { Container } from './container'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { ButtonToggleTheme } from './ui/button-toggle-theme'
import { Cart } from './cart'
import { Login } from './login'
import { Favorites } from './favorites'
import { Logo } from './logo'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<div className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur-xl">
			<Container>
				<div className="flex items-center justify-center py-4">
					<Logo />
					<Link
						href="https://github.com/tramalretard"
						className="mr-10 text-xs"
					>
						<p>Github</p>
					</Link>
					<SearchInput />
					<Favorites />
					<div className="flex items-center gap-5">
						<Login />
						<Cart />
						<ButtonToggleTheme />
					</div>
				</div>
			</Container>
		</div>
	)
}
