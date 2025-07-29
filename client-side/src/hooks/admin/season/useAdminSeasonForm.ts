'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { ISeason, ISeasonCreate } from '@/shared/types/season.interface'
import { adminSeasonService } from '@/services/admin/admin.season.service'
import { generateSlug } from '@/lib/generate-slug'

export type ISeasonFormData = Omit<ISeason, 'id' | 'slug'>

export const useAdminSeasonForm = (seasonSlug?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ISeasonFormData>({
		defaultValues: {
			name: '',
		},
	})

	const isEditMode = !!seasonSlug

	const { data: seasonData, isLoading: isGetLoading } = useQuery({
		queryKey: ['get admin season by slug', seasonSlug],
		queryFn: () => adminSeasonService.getSeasonBySlug(seasonSlug!),
		enabled: isEditMode,
	})

	useEffect(() => {
		if (isEditMode && seasonData) {
			setValue('name', seasonData.name)
		}
	}, [isEditMode, seasonData, setValue])

	const { mutate: createSeason, isPending: isCreatePending } = useMutation({
		mutationKey: ['create season'],
		mutationFn: (data: ISeasonCreate) => adminSeasonService.createSeason(data),
		onSuccess: () => {
			toast.success('Сезон успешно создан!')
			queryClient.invalidateQueries({ queryKey: ['get all admin seasons'] })
			router.push('/admin/seasons')
		},
		onError: () => {
			toast.error('Ошибка при создании сезона')
		},
	})

	const { mutate: updateSeason, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update season', seasonSlug],
		mutationFn: (data: ISeasonCreate) =>
			adminSeasonService.updateSeason(data, seasonSlug!),
		onSuccess: () => {
			toast.success('Изменения успешно сохранены!')
			queryClient.invalidateQueries({ queryKey: ['get all admin seasons'] })
			queryClient.invalidateQueries({
				queryKey: ['get admin season by slug', seasonSlug],
			})
			router.push('/admin/seasons')
		},
		onError: () => {
			toast.error('Ошибка при сохранении изменений')
		},
	})

	const onSubmit: SubmitHandler<ISeasonFormData> = data => {
		const dataForApi: ISeasonCreate = {
			...data,
			slug: generateSlug(data.name),
		}

		if (isEditMode) {
			updateSeason(dataForApi)
		} else {
			createSeason(dataForApi)
		}
	}

	return {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isLoading: isGetLoading,
		isPending: isCreatePending || isUpdatePending,
		isEditMode,
	}
}
