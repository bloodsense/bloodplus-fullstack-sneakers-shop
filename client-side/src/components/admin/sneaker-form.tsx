'use client'

import { Controller } from 'react-hook-form'
import { useAdminSneakerForm } from '@/hooks/admin/sneakers/useAdminSneakersForm'
import { UploadImages } from './upload-images'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/form/input'
import { AdminFormSkeleton } from '../skeletons/admin-form-skeleton'

interface ISneakerFormProps {
	sneakerSlug?: string
}

export const SneakerForm = ({ sneakerSlug }: ISneakerFormProps) => {
	const {
		register,
		handleSubmit,
		errors,
		control,
		onSubmit,
		isLoading,
		isPending,
		isEditMode,
		brands,
		seasons,
		colors,
		sizes,
		stockFields,
		addStock,
		removeStock,
	} = useAdminSneakerForm(sneakerSlug)

	if (isLoading) {
		return <AdminFormSkeleton />
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Основная информация</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<Label htmlFor="name">Название</Label>
						<Input
							id="name"
							{...register('name', { required: 'Укажите название' })}
							placeholder="Например, Nike Air Force 1"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
						)}
					</div>
					<div>
						<Label htmlFor="price">Цена</Label>
						<Input
							id="price"
							type="number"
							{...register('price', {
								required: 'Укажите цену',
								valueAsNumber: true,
							})}
							placeholder="Например, 15000"
						/>
						{errors.price && (
							<p className="text-red-500 text-sm mt-1">
								{errors.price.message}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="description">Описание</Label>
						<Textarea
							id="description"
							{...register('description')}
							placeholder="Подробная информация о модели"
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Изображения</CardTitle>
				</CardHeader>
				<CardContent>
					<UploadImages control={control} />
					{errors.images && (
						<p className="text-red-500 text-sm mt-2">{errors.images.message}</p>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Связь модели с брендом, сезоном и цветом</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<Label>Бренд</Label>
						<Controller
							name="brandId"
							control={control}
							rules={{ required: 'Выберите бренд' }}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите бренд" />
									</SelectTrigger>
									<SelectContent>
										{brands?.map(b => (
											<SelectItem key={b.id} value={b.id}>
												{b.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div>
						<Label>Сезон</Label>
						<Controller
							name="seasonId"
							control={control}
							rules={{ required: 'Выберите сезон' }}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите сезон" />
									</SelectTrigger>
									<SelectContent>
										{seasons?.map(s => (
											<SelectItem key={s.id} value={s.id}>
												{s.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
					<div>
						<Label>Цвет</Label>
						<Controller
							name="colorId"
							control={control}
							rules={{ required: 'Выберите цвет' }}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите цвет" />
									</SelectTrigger>
									<SelectContent>
										{colors?.map(c => (
											<SelectItem key={c.id} value={c.id}>
												{c.value}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Размеры и остатки</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{stockFields.map((field, index) => (
						<div key={field.id} className="flex items-center gap-4">
							<div className="flex-1">
								<Controller
									name={`stocks.${index}.sizeId`}
									control={control}
									rules={{ required: true }}
									render={({ field: selectField }) => (
										<Select
											onValueChange={selectField.onChange}
											value={selectField.value}
										>
											<SelectTrigger>
												<SelectValue placeholder="Выберите размер" />
											</SelectTrigger>
											<SelectContent>
												{sizes?.map(s => (
													<SelectItem key={s.id} value={s.id}>
														{s.value} ({s.type})
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</div>
							<div className="flex-1">
								<Input
									type="number"
									placeholder="Кол-во"
									{...register(`stocks.${index}.quantity`, {
										required: true,
										valueAsNumber: true,
										min: { value: 0, message: 'Не может быть < 0' },
									})}
								/>
							</div>
							<Button
								type="button"
								size="icon"
								variant="ghost"
								className="w-20"
								onClick={() => removeStock(index)}
							>
								Удалить
							</Button>
						</div>
					))}
					<Button type="button" variant="outline" onClick={addStock}>
						Добавить размер
					</Button>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Дополнительная информация</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<Label>Пол</Label>
						<Controller
							name="sneakerInfo.gender"
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger>
										<SelectValue placeholder="Выберите пол" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="men">Мужской</SelectItem>
										<SelectItem value="women">Женский</SelectItem>
										<SelectItem value="unisex">Унисекс</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
					</div>

					<div>
						<Label htmlFor="protection">
							Защита от влаги {'(не обязательно)'}
						</Label>
						<Input
							id="protection"
							placeholder="Оставьте поле пустым, если защиты нет"
							{...register('sneakerInfo.protection')}
						/>
					</div>
					<div>
						<Label htmlFor="warranty">Гарантия {'(не обязательно)'}</Label>
						<Input
							id="warranty"
							placeholder="Оставьте поле пустым, если гарантии нет"
							{...register('sneakerInfo.warranty')}
						/>
					</div>
					<div>
						<Label htmlFor="warrantyTime">
							Срок гарантии {'(не обязательно)'}
						</Label>
						<Input
							id="warrantyTime"
							placeholder="Оставьте поле пустым, если гарантии нет"
							{...register('sneakerInfo.warrantyTime')}
						/>
					</div>

					<div>
						<Label htmlFor="country">Страна производитель</Label>
						<Input
							id="country"
							placeholder="Например, Китай"
							{...register('sneakerInfo.country')}
						/>
					</div>
					<div>
						<Label htmlFor="code">Артикул</Label>
						<Input
							id="code"
							placeholder="Например, CU9225-100"
							{...register('sneakerInfo.code')}
						/>
					</div>
				</CardContent>
			</Card>

			<Button type="submit" disabled={isPending} className="w-full md:w-auto">
				{isPending
					? 'Сохранение...'
					: isEditMode
					? 'Сохранить изменения'
					: 'Создать кроссовки'}
			</Button>
		</form>
	)
}
