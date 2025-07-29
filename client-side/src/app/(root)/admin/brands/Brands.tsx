'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminBrands } from '@/hooks/admin/brands/useAdminBrands'
import { ADMIN_URL } from '@/config/urls.constants'
import { Container } from '@/components/container'
import { IBrand } from '@/shared/types/brand.interface'
import { AdminDataTable, IColumn } from '@/components/ui/admin/admin-data-table'
import { AdminPageHeader } from '@/components/ui/admin/admin-page-header'
import { AdminDeleteAlert } from '@/components/ui/admin/admin-delete-alert'

const columns: IColumn<IBrand>[] = [
	{
		key: 'name',
		header: 'Название',
		cell: item => <span className="font-medium">{item.name}</span>,
	},
	{
		key: 'slug',
		header: 'Слаг (URL)',
		cell: item => <span>{item.slug}</span>,
	},
]

const Brands = () => {
	const router = useRouter()
	const { brands, isLoading, deleteBrand } = useAdminBrands()
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
			deleteBrand(itemToDelete.slug)
			setItemToDelete(null)
			setIsDialogOpen(false)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<AdminPageHeader
					title="Управление брендами"
					createUrl={ADMIN_URL.brands.create()}
					buttonText="Создать новый бренд"
				/>

				<AdminDataTable
					data={brands}
					columns={columns}
					isLoading={isLoading}
					uniqueKey="slug"
					onEdit={slug => router.push(ADMIN_URL.brands.put(slug))}
					onDelete={handleOpenDeleteDialog}
				/>
			</div>

			<AdminDeleteAlert
				isOpen={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onConfirm={confirmDelete}
				entityName={itemToDelete?.name}
			/>
		</Container>
	)
}

export default Brands
