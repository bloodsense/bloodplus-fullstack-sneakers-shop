import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authService } from '@/services/auth/auth.service'
import { PUBLIC_URL } from '@/config/urls.constants'

export const useLogout = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: logout, isPending } = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ['profile'] })

			toast.success('Успешный выход из системы!')
			router.push(PUBLIC_URL.home())
		},
		onError: () => {
			toast.error('Не удалось выйти из системы. Попробуйте позже')
		},
	})

	return { logout, isPending }
}
