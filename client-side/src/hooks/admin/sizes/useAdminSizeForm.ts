'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ISize, ISizeCreate, SizeType } from '@/shared/types/size.interface'
import { ADMIN_URL } from '@/config/urls.constants'
import { adminSizeService } from '@/services/admin/admin.size.service'

export const useAdminSizeForm = (sizeId?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm<ISizeCreate>({
		defaultValues: {
			value: '',
			type: SizeType.RU,
		},
	})

	const isEditMode = !!sizeId

	const { data: sizeData, isLoading: isGetLoading } = useQuery({
		queryKey: ['get admin size by id', sizeId],
		queryFn: () => adminSizeService.getSizeById(sizeId!),
		enabled: isEditMode,
	})

	useEffect(() => {
		if (isEditMode && sizeData) {
			setValue('value', sizeData.value)
			setValue('type', sizeData.type)
		}
	}, [isEditMode, sizeData, setValue])

	const { mutate: createSize, isPending: isCreatePending } = useMutation({
		mutationKey: ['create size'],
		mutationFn: (data: ISizeCreate) => adminSizeService.createSize(data),
		onSuccess: () => {
			toast.success('Размер успешно создан!')
			queryClient.invalidateQueries({ queryKey: ['get all admin sizes'] })
			router.push(ADMIN_URL.sizes.page())
		},
		onError: () => {
			toast.error('Ошибка при создании размера')
		},
	})

	const { mutate: updateSize, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update size', sizeId],
		mutationFn: (data: ISizeCreate) =>
			adminSizeService.updateSize(data, sizeId!),
		onSuccess: () => {
			toast.success('Изменения успешно сохранены!')
			queryClient.invalidateQueries({ queryKey: ['get all admin sizes'] })
			queryClient.invalidateQueries({
				queryKey: ['get admin size by id', sizeId],
			})
			router.push(ADMIN_URL.sizes.page())
		},
		onError: () => {
			toast.error('Ошибка при сохранении изменений')
		},
	})

	const onSubmit: SubmitHandler<ISizeCreate> = data => {
		if (isEditMode) {
			updateSize(data)
		} else {
			createSize(data)
		}
	}

	return {
		register,
		handleSubmit,
		errors,
		control,
		onSubmit,
		isLoading: isGetLoading,
		isPending: isCreatePending || isUpdatePending,
		isEditMode,
	}
}
