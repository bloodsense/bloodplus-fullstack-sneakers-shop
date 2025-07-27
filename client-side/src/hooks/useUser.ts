import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { getAccessToken } from '@/services/auth/access-token.service'

export const useUser = () => {
	const accessToken = getAccessToken()

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: !!accessToken,
	})

	return { user, isLoading, isError }
}
