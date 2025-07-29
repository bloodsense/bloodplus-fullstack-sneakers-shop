'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { sizeService } from '@/services/admin/admin.size.service'

export const useAdminSizes = () => {
	const queryClient = useQueryClient()

	const { data: sizes, isLoading } = useQuery({
		queryKey: ['get all admin sizes'],
		queryFn: () => sizeService.getAllSizes(),
	})

	const { mutate: deleteSize } = useMutation({
		mutationKey: ['delete size'],
		mutationFn: (id: string) => sizeService.deleteSize(id),
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
