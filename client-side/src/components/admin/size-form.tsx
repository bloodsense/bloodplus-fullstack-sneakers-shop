'use client'

import { Controller } from 'react-hook-form'
import { useAdminSizeForm } from '@/hooks/admin/sizes/useAdminSizeForm'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { SizeType } from '@/shared/types/size.interface'
import { Label } from '../ui/form/label'
import { Input } from '../ui/form/input'

interface ISizeFormProps {
	sizeId?: string
}

export const SizeForm = ({ sizeId }: ISizeFormProps) => {
	const {
		register,
		handleSubmit,
		errors,
		control,
		onSubmit,
		isLoading,
		isPending,
		isEditMode,
	} = useAdminSizeForm(sizeId)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl">
			{isLoading ? (
				<p>Загрузка данных...</p>
			) : (
				<div className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="value">Значение размера</Label>
						<Input
							id="value"
							placeholder="Например, 42.5 или 9.5"
							{...register('value', {
								required: 'Это поле обязательно',
							})}
						/>
						{errors.value && (
							<p className="text-sm text-red-500 mt-1">
								{errors.value.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label>Тип размера</Label>
						<Controller
							name="type"
							control={control}
							render={({ field }) => (
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Выберите тип размера" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value={SizeType.RU}>RU</SelectItem>
										<SelectItem value={SizeType.EU}>EU</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>

					<Button type="submit" disabled={isPending}>
						{isPending
							? 'Сохранение...'
							: isEditMode
							? 'Сохранить изменения'
							: 'Создать размер'}
					</Button>
				</div>
			)}
		</form>
	)
}
