import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from './useUser'
import { PUBLIC_URL } from '@/config/urls.constants'

export const useAuthRedirect = () => {
	const { user, isLoading } = useUser()

	const router = useRouter()

	useEffect(() => {
		if (isLoading) {
			return
		}

		if (!user) {
			router.push(PUBLIC_URL.auth())
		}
	}, [user, isLoading, router])
}
