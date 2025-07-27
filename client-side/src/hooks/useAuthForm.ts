'use client'

import { PUBLIC_URL } from '@/config/urls.constants'
import { authService } from '@/services/auth/auth.service'
import { IAuthForm } from '@/shared/types/auth.interface'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function useAuthForm(isRegistration: boolean) {
	const router = useRouter()

	const form = useForm<IAuthForm>({
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isRegistration ? 'register' : 'login', data),

		onSuccess() {
			form.reset()

			if (isRegistration) {
				toast.success('Успешная регистрация в системе!')
			} else toast.success('Успешная авторизация в системе!')

			router.replace(PUBLIC_URL.home())
		},

		onError(error: any) {
			if (error?.response?.data?.message) {
				toast.error(error?.response?.data?.message)
			} else {
				toast.error(
					'Возникла ошибка при авторизации в системе. Попробуйте позже'
				)
			}
		},
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return { onSubmit, form, isPending }
}
