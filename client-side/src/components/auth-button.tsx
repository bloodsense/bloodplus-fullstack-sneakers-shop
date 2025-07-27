'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { useUser } from '@/hooks/useUser'
import { PUBLIC_URL } from '@/config/urls.constants'

interface Props {
	className?: string
}

export const AuthButton: React.FC<Props> = ({ className }) => {
	const { user } = useUser()

	const buttonWidth = 'min-w-[102px]'

	return (
		<div className={className}>
			{user ? (
				<Button variant="outline" asChild className={buttonWidth}>
					<Link href={PUBLIC_URL.profile()}>Профиль</Link>
				</Button>
			) : (
				<Button variant="outline" asChild className={buttonWidth}>
					<Link href={PUBLIC_URL.auth.auth()}>Войти</Link>
				</Button>
			)}
		</div>
	)
}
