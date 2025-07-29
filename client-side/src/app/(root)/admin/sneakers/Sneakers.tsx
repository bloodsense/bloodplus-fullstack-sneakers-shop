'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAdminSneakers } from '@/hooks/admin/sneakers/useAdminSneakers'
import { ADMIN_URL } from '@/config/urls.constants'
import { Container } from '@/components/container'
import { ISneaker } from '@/shared/types/sneaker.interface'
import { AdminDataTable, IColumn } from '@/components/ui/admin/admin-data-table'
import { AdminPageHeader } from '@/components/ui/admin/admin-page-header'
import { AdminDeleteAlert } from '@/components/ui/admin/admin-delete-alert'

const columns: IColumn<ISneaker>[] = [
	{
		key: 'images',
		header: 'Фото',
		cell: item => (
			<Image
				src={item.images[0] || '/placeholder.png'}
				alt={item.name}
				width={64}
				height={64}
				className="rounded-md object-cover"
			/>
		),
	},
	{
		key: 'name',
		header: 'Название',
		cell: item => <span className="font-medium">{item.name}</span>,
	},
	{
		key: 'brand',
		header: 'Бренд',
		cell: item => <span>{item.brand.name}</span>,
	},
	{
		key: 'price',
		header: 'Цена',
		cell: item => <span>{item.price} ₽</span>,
	},
]

const Sneakers = () => {
	const router = useRouter()
	const { sneakers, isLoading, deleteSneaker } = useAdminSneakers()

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState<{
		slug: string
		name: string
	} | null>(null)

	const handleOpenDeleteDialog = (slug: string, name: string) => {
		setItemToDelete({ slug, name })
		setIsDialogOpen(true)
	}

	const confirmDelete = () => {
		if (itemToDelete) {
			deleteSneaker(itemToDelete.slug)
			setItemToDelete(null)
			setIsDialogOpen(false)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<AdminPageHeader
					title="Управление кроссовками"
					createUrl={ADMIN_URL.sneakers.create()}
					buttonText="Создать новые кроссовки"
				/>

				<AdminDataTable
					data={sneakers}
					columns={columns}
					isLoading={isLoading}
					uniqueKey="slug"
					onEdit={slug => router.push(ADMIN_URL.sneakers.put(slug))}
					onDelete={handleOpenDeleteDialog}
				/>
			</div>

			<AdminDeleteAlert
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onConfirm={confirmDelete}
				entityName={itemToDelete?.name.toLowerCase()}
			/>
		</Container>
	)
}

export default Sneakers
