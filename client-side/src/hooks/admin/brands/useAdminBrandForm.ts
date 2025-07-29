'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { IBrand, IBrandCreate } from '@/shared/types/brand.interface'
import { adminBrandService } from '@/services/admin/admin.brand.service'
import { generateSlug } from '@/lib/generate-slug'
import { ADMIN_URL } from '@/config/urls.constants'

export type IBrandFormData = Omit<IBrand, 'id' | 'slug'>

export const useAdminBrandForm = (brandSlug?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IBrandFormData>({
		defaultValues: {
			name: '',
		},
	})

	const isEditMode = !!brandSlug

	const { data: brandData, isLoading: isGetLoading } = useQuery({
		queryKey: ['get admin brand by slug', brandSlug],
		queryFn: () => adminBrandService.getBrandBySlug(brandSlug!),
		enabled: isEditMode,
	})

	useEffect(() => {
		if (isEditMode && brandData) {
			setValue('name', brandData.name)
		}
	}, [isEditMode, brandData, setValue])

	const { mutate: createBrand, isPending: isCreatePending } = useMutation({
		mutationKey: ['create brand'],
		mutationFn: (data: IBrandCreate) => adminBrandService.createBrand(data),
		onSuccess: () => {
			toast.success('Бренд успешно создан!')
			queryClient.invalidateQueries({ queryKey: ['get all admin brands'] })
			router.push(ADMIN_URL.brands.page())
		},
		onError: () => {
			toast.error('Ошибка при создании бренда')
		},
	})

	const { mutate: updateBrand, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update brand', brandSlug],
		mutationFn: (data: IBrandCreate) =>
			adminBrandService.updateBrand(data, brandSlug!),
		onSuccess: () => {
			toast.success('Изменения успешно сохранены!')
			queryClient.invalidateQueries({ queryKey: ['get all admin brands'] })
			queryClient.invalidateQueries({
				queryKey: ['get admin brand by slug', brandSlug],
			})
			router.push(ADMIN_URL.brands.page())
		},
		onError: () => {
			toast.error('Ошибка при сохранении изменений')
		},
	})

	const onSubmit: SubmitHandler<IBrandFormData> = data => {
		const dataForApi: IBrandCreate = {
			...data,
			slug: generateSlug(data.name),
		}

		if (isEditMode) {
			updateBrand(dataForApi)
		} else {
			createBrand(dataForApi)
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
