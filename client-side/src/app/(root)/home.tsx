'use client'

import { BrowseSneakers } from '@/components/browse-sneakers'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TopBar } from '@/components/top-bar'
import { saveTokenInStorage } from '@/services/auth/access-token.service'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export const Home = () => {
	const searchParams = useSearchParams()

	React.useEffect(() => {
		const accessToken = searchParams.get('accessToken')

		if (accessToken) saveTokenInStorage(accessToken)
	}, [searchParams])

	return (
		<>
			<Header />
			<TopBar />
			<BrowseSneakers />
			<Footer />
		</>
	)
}
