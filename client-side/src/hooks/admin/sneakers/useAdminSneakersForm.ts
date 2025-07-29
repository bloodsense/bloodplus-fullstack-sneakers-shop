'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { toast } from 'sonner'
import type { ISneakerCreate } from '@/shared/types/sneaker.interface'
import { adminSneakerService } from '@/services/admin/admin.sneaker.service'
import { sneakerService } from '@/services/sneaker.service'
import { generateSlug } from '@/lib/generate-slug'
import { ADMIN_URL } from '@/config/urls.constants'
import { useAdminFormOptions } from './useAdminFormOptions'

export const useAdminSneakerForm = (sneakerSlug?: string) => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm<ISneakerCreate>({
		defaultValues: {
			name: '',
			price: 0,
			description: '',
			images: [],
			brandId: '',
			seasonId: '',
			colorId: '',
			stocks: [],
			sneakerInfo: {
				gender: 'men',
				country: '',
				protection: '',
				warranty: '',
				warrantyTime: '',
				code: '',
			},
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'stocks',
	})

	const isEditMode = !!sneakerSlug

	const {
		brands,
		seasons,
		colors,
		sizes,
		isLoading: areOptionsLoading,
	} = useAdminFormOptions()

	const { data: sneakerData, isLoading: isSneakerLoading } = useQuery({
		queryKey: ['get admin sneaker by slug', sneakerSlug],
		queryFn: () => sneakerService.watchSneakerByBrand('all', sneakerSlug!),
		enabled: isEditMode,
	})

	useEffect(() => {
		if (isEditMode && sneakerData) {
			setValue('name', sneakerData.name)
			setValue('slug', sneakerData.slug)
			setValue('price', sneakerData.price)
			setValue('description', sneakerData.description)
			setValue('images', sneakerData.images)
			setValue('brandId', sneakerData.brand.id)
			setValue('seasonId', sneakerData.season.id)
			setValue('colorId', sneakerData.color.id)
			setValue(
				'stocks',
				sneakerData.stocks.map(s => ({
					sizeId: s.size.id,
					quantity: s.quantity,
				}))
			)
			if (sneakerData.sneakerInfo) {
				setValue('sneakerInfo', sneakerData.sneakerInfo)
			}
		}
	}, [isEditMode, sneakerData, setValue])

	const { mutate: createSneaker, isPending: isCreatePending } = useMutation({
		mutationKey: ['create sneaker'],
		mutationFn: (data: ISneakerCreate) =>
			adminSneakerService.createSneaker(data),
		onSuccess: () => {
			toast.success('Кроссовки успешно созданы!')
			router.push(ADMIN_URL.sneakers.page())
		},
		onError: () => toast.error('Ошибка при создании'),
	})

	const { mutate: updateSneaker, isPending: isUpdatePending } = useMutation({
		mutationKey: ['update sneaker', sneakerSlug],
		mutationFn: (data: ISneakerCreate) =>
			adminSneakerService.updateSneaker(sneakerSlug!, data),
		onSuccess: () => {
			toast.success('Изменения успешно сохранены!')
			router.push(ADMIN_URL.sneakers.page())
		},
		onError: () => toast.error('Ошибка при обновлении'),
	})

	const onSubmit: SubmitHandler<ISneakerCreate> = data => {
		const dataForApi: ISneakerCreate = {
			...data,
			price: Number(data.price),
			slug: generateSlug(data.name),
		}

		if (isEditMode) {
			updateSneaker(dataForApi)
		} else {
			createSneaker(dataForApi)
		}
	}

	return {
		register,
		handleSubmit,
		errors,
		control,
		onSubmit,
		isEditMode,
		isLoading: isSneakerLoading || areOptionsLoading,
		isPending: isCreatePending || isUpdatePending,
		brands,
		seasons,
		colors,
		sizes,
		stockFields: fields,
		addStock: () => append({ sizeId: '', quantity: 1 }),
		removeStock: (index: number) => remove(index),
	}
}
