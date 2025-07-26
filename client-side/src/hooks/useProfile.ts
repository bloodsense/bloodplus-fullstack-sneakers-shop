import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'

export const useProfile = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		retry: false,
	})

	return { profile: data, isLoading, isError }
}
