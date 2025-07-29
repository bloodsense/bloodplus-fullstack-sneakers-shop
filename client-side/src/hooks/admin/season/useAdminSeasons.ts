'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { seasonService } from '@/services/season.service'
import { adminSeasonService } from '@/services/admin/admin.season.service'

export const useAdminSeasons = () => {
	const queryClient = useQueryClient()

	const { data: seasons, isLoading } = useQuery({
		queryKey: ['get all admin seasons'],
		queryFn: () => seasonService.getAllSeasons(),
	})

	const { mutate: deleteSeason } = useMutation({
		mutationKey: ['delete season'],
		mutationFn: (slug: string) => adminSeasonService.deleteSeason(slug),
		onSuccess: () => {
			toast.success('Сезон успешно удален!')
			queryClient.invalidateQueries({ queryKey: ['get all admin seasons'] })
		},
		onError: () => {
			toast.error('Произошла ошибка при удалении сезона')
		},
	})

	return {
		seasons,
		isLoading,
		deleteSeason,
	}
}
