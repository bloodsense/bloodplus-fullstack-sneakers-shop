'use client'

import { useAdminBrandForm } from '@/hooks/admin/brands/useAdminBrandForm'
import { Button } from '@/components/ui/button'
import { Label } from '../ui/form/label'
import { Input } from '../ui/form/input'

interface IBrandFormProps {
	brandSlug?: string
}

export const BrandForm = ({ brandSlug }: IBrandFormProps) => {
	const {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isLoading,
		isPending,
		isEditMode,
	} = useAdminBrandForm(brandSlug)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
			{isLoading ? (
				<p>Загрузка данных...</p>
			) : (
				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name">Название бренда</Label>
						<Input
							id="name"
							placeholder="Например, Nike"
							{...register('name', {
								required: 'Это поле обязательно для заполнения',
							})}
						/>
						{errors.name && (
							<p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
						)}
					</div>

					<Button type="submit" disabled={isPending}>
						{isPending
							? 'Сохранение...'
							: isEditMode
							? 'Сохранить изменения'
							: 'Создать бренд'}
					</Button>
				</div>
			)}
		</form>
	)
}
