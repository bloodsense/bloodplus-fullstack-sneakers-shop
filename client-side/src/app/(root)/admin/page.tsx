'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Container } from '@/components/container'
import { LayoutDashboard } from 'lucide-react'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { adminSectionsUrl } from '@/constants/admin-url-sections-constants'

export default function AdminDashboardPage() {
	useAuthRedirect()
	const adminSections = adminSectionsUrl

	return (
		<Container className="my-10">
			<div className="flex items-center gap-3 mb-8">
				<LayoutDashboard className="h-6 w-6" strokeWidth={1} />
				<h1 className="text-xl font-semibold">Админ-панель</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{adminSections.map(section => (
					<Link href={section.href} key={section.href} className="block">
						<Card className="h-full hover:border-primary transition-colors duration-200 hover:shadow-lg">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									{section.title}
								</CardTitle>
								<section.icon className="h-5 w-5 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									{section.description}
								</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</Container>
	)
}
