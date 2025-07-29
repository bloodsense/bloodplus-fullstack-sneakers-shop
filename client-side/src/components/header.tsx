'use client'

import { Container } from './container'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { Favorites } from './favorites'
import { Logo } from './logo'
import { useCartStore } from '@/stores/cart-store'
import React from 'react'
import { CartSheet } from './cart/cart-sheet'
import { useUser } from '@/hooks/useUser'
import { HeaderButtonsSkeleton } from './skeletons/header-buttons-skeleton'
import { AuthButton } from './buttons/auth-button'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	const [isClient, setIsClient] = React.useState(false)
	React.useEffect(() => {
		setIsClient(true)
	}, [])

	const { isLoading: isProfileLoading } = useUser()

	const { items } = useCartStore()
	const itemCount = items.length
	const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

	const showSkeleton = !isClient || isProfileLoading

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

					{showSkeleton ? (
						<HeaderButtonsSkeleton />
					) : (
						<div className="flex items-center gap-5">
							<AuthButton />
							<CartSheet
								items={items}
								itemCount={itemCount}
								totalPrice={totalPrice}
							/>
						</div>
					)}
				</div>
			</Container>
		</div>
	)
}
