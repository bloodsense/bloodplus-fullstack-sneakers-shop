'use client'

import { saveTokenInStorage } from '@/services/auth/access-token.service'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
	className?: string
}

export const Home: React.FC<Props> = ({ className }) => {
	const searchParams = useSearchParams()

	React.useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) saveTokenInStorage(accessToken)
	}, [searchParams])

	return <div className={className}>Home Component</div>
}
