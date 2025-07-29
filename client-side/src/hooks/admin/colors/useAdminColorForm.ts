import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import type { IColor } from '@/shared/types/color.interface'
import { useEffect } from 'react'
import { adminColorService } from '@/services/admin/admin.color.service'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/generate-slug'

export type IColorFormData = Omit<IColor, 'id' | 'slug'>

export const useAdminColorForm = (colorSlug?: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<IColorFormData>({
		defaultValues: {
			value: '',
			hex: '#000000',
		},
	})

	const isEditMode = !!colorSlug

	const {
		data: colorData,
		isLoading: isGetLoading,
		isSuccess: isGetSuccess,
	} = useQuery({
		queryKey: ['get admin color by slug', colorSlug],
		queryFn: () => adminColorService.getColorBySlug(colorSlug!),
		enabled: isEditMode,
	})

	useEffect(() => {
		if (isGetSuccess && colorData) {
			setValue('value', colorData.value)
			setValue('hex', colorData.hex)
		}
	}, [isGetSuccess, colorData, setValue])

	const { mutate: createColor, isPending: isCreatePending } = useMutation({
		mutationKey: ['create color'],
		mutationFn: (data: Omit<IColor, 'id'>) =>
			adminColorService.createColor(data),
		onSuccess: () => {
			toast.success('Цвет успешно создан!')
			queryClient.invalidateQueries({ queryKey: ['get all admin colors'] })
			router.push('/admin/colors')
		},
		onError: err => {
			toast.error('Ошибка при создании цвета')
			console.error(err)
		},
	})

	const { mutate: updateColor, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update color', colorSlug],
		mutationFn: (data: Omit<IColor, 'id'>) =>
			adminColorService.updateColor(data, colorSlug!),
		onSuccess: () => {
			toast.success('Изменения успешно сохранены!')
			queryClient.invalidateQueries({ queryKey: ['get all admin colors'] })
			queryClient.invalidateQueries({
				queryKey: ['get admin color by slug', colorSlug],
			})
			router.push('/admin/colors')
		},
		onError: err => {
			toast.error('Ошибка при сохранении изменений')
			console.error(err)
		},
	})

	const onSubmit: SubmitHandler<IColorFormData> = data => {
		const dataWithSlug = {
			...data,
			slug: generateSlug(data.value),
		}

		if (isEditMode) {
			updateColor(dataWithSlug)
		} else {
			createColor(dataWithSlug)
		}
	}

	return {
		register,
		handleSubmit,
		errors,
		setValue,
		watch,
		onSubmit,
		isLoading: isGetLoading,
		isPending: isCreatePending || isUpdatePending,
		isEditMode,
	}
}
