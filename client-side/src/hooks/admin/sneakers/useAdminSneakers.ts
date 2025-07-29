'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sneakerService } from '@/services/sneaker.service'
import { adminSneakerService } from '@/services/admin/admin.sneaker.service'

export const useAdminSneakers = () => {
	const queryClient = useQueryClient()

	const { data: sneakers, isLoading } = useQuery({
		queryKey: ['get all admin sneakers'],
		queryFn: () => sneakerService.getAllSneakers(),
	})

	const { mutate: deleteSneaker } = useMutation({
		mutationKey: ['delete sneaker'],
		mutationFn: (slug: string) => adminSneakerService.deleteSneaker(slug),
		onSuccess: () => {
			toast.success('Кроссовки успешно удалены!')
			queryClient.invalidateQueries({ queryKey: ['get all admin sneakers'] })
		},
		onError: () => {
			toast.error('Произошла ошибка при удалении')
		},
	})

	return {
		sneakers,
		isLoading,
		deleteSneaker,
	}
}
