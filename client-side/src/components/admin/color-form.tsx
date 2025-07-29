'use client'

import { useAdminColorForm } from '@/hooks/admin/colors/useAdminColorForm'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/form/input'
import { Button } from '../ui/button'

interface IColorFormProps {
	colorSlug?: string
}

export const ColorForm = ({ colorSlug }: IColorFormProps) => {
	const {
		register,
		handleSubmit,
		errors,
		watch,
		setValue,
		onSubmit,
		isLoading,
		isPending,
		isEditMode,
	} = useAdminColorForm(colorSlug)

	const hexValue = watch('hex')

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
			{isLoading ? (
				<p>Загрузка данных...</p>
			) : (
				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="value">Название цвета</Label>
						<Input
							id="value"
							placeholder="Например, Ярко-красный"
							{...register('value', {
								required: 'Это поле обязательно для заполнения',
							})}
						/>
						{errors.value && (
							<p className="text-sm text-red-500 mt-1">
								{errors.value.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="hex">HEX код</Label>
						<div className="flex items-center gap-2">
							<Input
								type="color"
								className="p-1 h-10 w-14"
								{...register('hex')}
								value={hexValue}
								onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
									setValue('hex', e.target.value, {
										shouldValidate: true,
									})
								}
							/>
							<Input
								id="hex"
								placeholder="#FF0000"
								{...register('hex', {
									required: 'Это поле обязательно',
									pattern: {
										value: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
										message: 'Введите корректный HEX код (например, #FF5733)',
									},
								})}
							/>
						</div>
						{errors.hex && (
							<p className="text-sm text-red-500 mt-1">{errors.hex.message}</p>
						)}
					</div>

					<Button type="submit" disabled={isPending}>
						{isPending
							? 'Сохранение...'
							: isEditMode
							? 'Сохранить изменения'
							: 'Создать цвет'}
					</Button>
				</div>
			)}
		</form>
	)
}
