'use client'

import { adminSizeService } from '@/services/admin/admin.size.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAdminSizes = () => {
	const queryClient = useQueryClient()

	const { data: sizes, isLoading } = useQuery({
		queryKey: ['get all admin sizes'],
		queryFn: () => adminSizeService.getAllSizes(),
	})

	const { mutate: deleteSize } = useMutation({
		mutationKey: ['delete size'],
		mutationFn: (id: string) => adminSizeService.deleteSize(id),
		onSuccess: () => {
			toast.success('Размер успешно удален!')
			queryClient.invalidateQueries({ queryKey: ['get all admin sizes'] })
		},
		onError: () => {
			toast.error('Произошла ошибка при удалении размера')
		},
	})

	return {
		sizes,
		isLoading,
		deleteSize,
	}
}
