'use client'

import { Button } from '@/components/ui/button'
import { useAdminSeasonForm } from '@/hooks/admin/season/useAdminSeasonForm'
import { Label } from '../ui/form/label'
import { Input } from '../ui/form/input'

interface ISeasonFormProps {
	seasonSlug?: string
}

export const SeasonForm = ({ seasonSlug }: ISeasonFormProps) => {
	const {
		register,
		handleSubmit,
		errors,
		onSubmit,
		isLoading,
		isPending,
		isEditMode,
	} = useAdminSeasonForm(seasonSlug)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
			{isLoading ? (
				<p>Загрузка данных...</p>
			) : (
				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="name">Название сезона</Label>
						<Input
							id="name"
							placeholder="Например, Весна-Лето 2025"
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
							: 'Создать сезон'}
					</Button>
				</div>
			)}
		</form>
	)
}
