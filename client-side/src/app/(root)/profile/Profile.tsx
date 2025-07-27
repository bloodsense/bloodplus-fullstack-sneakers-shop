'use client'

import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useProfile } from '@/hooks/useProfile'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
	useAuthRedirect()

	const { profile, isLoading } = useProfile()

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="h-10 w-10 animate-spin" />
			</div>
		)
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center space-x-4">
				<Avatar className="h-9 w-9">
					<AvatarImage src={profile?.picture} alt={profile?.name} />
					<AvatarFallback>{profile?.name?.[0]}</AvatarFallback>
				</Avatar>
				<div>
					<h1 className="text-2xl font-bold">{profile?.name}</h1>
					<p className="text-gray-500">{profile?.email}</p>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-xl font-semibold">Мои заказы</h2>
				{profile?.orders && profile.orders.length > 0 ? (
					<ul className="mt-4 space-y-4">
						{profile.orders.map(order => (
							<li key={order.id} className="rounded-lg border p-4">
								<p>Заказ #{order.id}</p>
								<p>Статус: {order.status}</p>
								<p>Сумма: {order.totalAmount}</p>
							</li>
						))}
					</ul>
				) : (
					<p className="mt-4">У вас еще нет заказов</p>
				)}
			</div>
		</div>
	)
}
