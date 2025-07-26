'use client'

import { Container } from './container'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { Login } from './login'
import { Favorites } from './favorites'
import { Logo } from './logo'
import { useCartStore } from '@/stores/cart-store'
import React from 'react'
import { CartSheet } from './cart/cart-sheet'
import { CartButtonSkeleton } from './skeletons/cart-button-skeleton'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	const [isClient, setIsClient] = React.useState(false)
	React.useEffect(() => {
		setIsClient(true)
	}, [])

	const { items } = useCartStore()

	const itemCount = items.length
	const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

	return (
		<div className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur-xl">
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
						{isClient ? (
							<CartSheet
								items={items}
								itemCount={itemCount}
								totalPrice={totalPrice}
							/>
						) : (
							<CartButtonSkeleton />
						)}
					</div>
				</div>
			</Container>
		</div>
	)
}
