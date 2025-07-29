'use client'

import { useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { toast } from 'sonner'
import Image from 'next/image'
import { Loader2, Trash, Upload } from 'lucide-react'
import { fileService } from '@/services/file.service'
import { Button } from '@/components/ui/button'
import { Label } from '../ui/form/label'

interface IUploadImagesProps {
	control: Control<any>
}

export const UploadImages = ({ control }: IUploadImagesProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const {
		field: { value: images, onChange },
	} = useController({
		name: 'images',
		control,
	})

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files?.length) return

		setIsLoading(true)
		const formData = new FormData()
		for (const file of Array.from(files)) {
			formData.append('files', file)
		}

		try {
			const response = await fileService.uploadFile(formData, 'sneakers')
			const newImageUrls = response.map(file => file.url)
			onChange([...(images || []), ...newImageUrls])
			toast.success('Изображения успешно загружены!')
		} catch (error) {
			toast.error('Ошибка при загрузке файлов')
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleRemoveImage = (urlToRemove: string) => {
		const updatedImages = images.filter(
			(imageUrl: string) => imageUrl !== urlToRemove
		)
		onChange(updatedImages)
	}

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{images?.map((url: string) => (
					<div key={url} className="relative group">
						<Image
							src={url}
							alt="Uploaded image"
							width={200}
							height={200}
							className="rounded-md object-cover aspect-square"
						/>
						<Button
							type="button"
							variant="default"
							className="absolute bottom-2 left-2 opacity-50 group-hover:opacity-100 transition-opacity h-7 w-20"
							onClick={() => handleRemoveImage(url)}
						>
							Удалить
						</Button>
					</div>
				))}
			</div>

			<div>
				<Label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-5 w-5 animate-spin" />
							<span>Загрузка...</span>
						</>
					) : (
						<>
							<Upload className="mr-2 h-5 w-5" />
							<span>Загрузить изображения</span>
						</>
					)}
					<input
						type="file"
						multiple
						className="sr-only"
						onChange={handleUpload}
						disabled={isLoading}
					/>
				</Label>
			</div>
		</div>
	)
}
