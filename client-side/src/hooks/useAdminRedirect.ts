'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './useUser'
import { PUBLIC_URL } from '@/config/urls.constants'

export const useAdminRedirect = () => {
	const { isAdmin, isLoading, user } = useUser()
	const { push } = useRouter()

	useEffect(() => {
		if (isLoading) {
			return
		}

		if (!isAdmin || !user) {
			push(PUBLIC_URL.home())
		}
	}, [isAdmin, isLoading, user, push])
}
