// @/hooks/admin/colors/useAdminColors.ts

import { adminColorService } from '@/services/admin/admin.color.service'
import { colorService } from '@/services/color.service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner' // <--- 1. Импортируем toast

export const useAdminColors = () => {
	const queryClient = useQueryClient()

	const { data: colors, isLoading } = useQuery({
		queryKey: ['get all admin colors'],
		queryFn: () => colorService.getAllColors(),
		select: data => data,
	})

	const { mutate: deleteColor, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete color'],
		mutationFn: (slug: string) => adminColorService.deleteColor(slug),
		onSuccess: () => {
			// <--- 2. Добавляем уведомление об успехе
			toast.success('Цвет успешно удален!')
			queryClient.invalidateQueries({ queryKey: ['get all admin colors'] })
		},
		onError: error => {
			// <--- 3. Добавляем уведомление об ошибке
			toast.error('Произошла ошибка при удалении цвета.')
			console.error('Error deleting color:', error)
		},
	})

	return {
		colors,
		isLoading,
		deleteColor,
		isDeletePending,
	}
}
