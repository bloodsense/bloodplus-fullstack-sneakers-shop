'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/config/urls.constants'

interface InvalidUrlErrorProps {
	title?: string
	description?: string
	className?: string
}

export const InvalidUrlError: React.FC<InvalidUrlErrorProps> = ({
	title = 'Такой страницы не существует',
	description = 'Кажется, вы перешли по неверному или устаревшему адресу',
	className,
}) => {
	const router = useRouter()

	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center h-full w-full p-8 text-center pt-65',
				className
			)}
		>
			<h3 className="text-2xl font-bold mb-4">{title}</h3>
			<p className="text-muted-foreground mb-6">{description}</p>
			<div className="flex gap-4">
				<Button
					variant="outline"
					onClick={() => router.push(PUBLIC_URL.home())}
				>
					На главную
				</Button>
			</div>
		</div>
	)
}
