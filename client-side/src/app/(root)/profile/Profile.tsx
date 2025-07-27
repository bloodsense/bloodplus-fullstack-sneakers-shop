'use client'

import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useProfile } from '@/hooks/useProfile'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/useLogout'
import { useIsClient } from '@/hooks/useIsClient'
import { Container } from '@/components/container'
import { CardOrderItem } from '@/components/card-order-item'
import { ProfileSkeleton } from '@/components/skeletons/profile-skeleton'

export const Profile = () => {
	useAuthRedirect()
	const { profile, isLoading } = useProfile()
	const { logout, isPending } = useLogout()
	const isClient = useIsClient()

	const showSkeleton = !isClient || isLoading

	if (showSkeleton) {
		return <ProfileSkeleton />
	}

	return (
		<Container className="pt-10 mb-10">
			<div className="mb-8 flex items-center justify-between pb-4 bg-foreground/5 p-4 rounded-lg">
				<div className="flex items-center space-x-4">
					<Avatar className="h-11 w-11">
						<AvatarImage src={profile?.picture} alt={profile?.name} />
						<AvatarFallback>{profile?.name?.[0]}</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<h1 className="text-xl">{profile?.name}</h1>
						<p className="text-foreground/50 text-sm">{profile?.email}</p>
						<p className="text-foreground/50 text-sm">ID: {profile?.id}</p>
					</div>
				</div>
				<Button variant="ghost" onClick={() => logout()} disabled={isPending}>
					<LogOut className="mr-2 h-4 w-4" />
					Выйти
				</Button>
			</div>

			<div className="mt-8">
				{profile?.orders && profile.orders.length > 0 ? (
					<ul className="mt-4 space-y-5">
						{profile.orders.map(order => (
							<CardOrderItem key={order.id} order={order} />
						))}
					</ul>
				) : (
					<p className="text-muted-foreground text-center pt-5">
						У вас еще нет заказов
					</p>
				)}
			</div>
		</Container>
	)
}
