'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { useAdminSizes } from '@/hooks/admin/sizes/useAdminSizes'
import { ADMIN_URL } from '@/config/urls.constants'
import { Container } from '@/components/container'
import { ISize } from '@/shared/types/size.interface'
import { AdminDataTable, IColumn } from '@/components/ui/admin/admin-data-table'
import { AdminPageHeader } from '@/components/ui/admin/admin-page-header'
import { AdminDeleteAlert } from '@/components/ui/admin/admin-delete-alert'

const columns: IColumn<ISize>[] = [
	{
		key: 'value',
		header: 'Значение',
		cell: item => <span className="font-medium">{item.value}</span>,
	},
	{
		key: 'type',
		header: 'Тип',
		cell: item => <Badge variant="outline">{item.type}</Badge>,
	},
]

const Sizes = () => {
	const router = useRouter()
	const { sizes, isLoading, deleteSize } = useAdminSizes()

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [itemToDelete, setItemToDelete] = useState<{
		id: string
		name: string
	} | null>(null)

	const handleOpenDeleteDialog = (id: string, name: string) => {
		setItemToDelete({ id, name })
		setIsDialogOpen(true)
	}

	const confirmDelete = () => {
		if (itemToDelete) {
			deleteSize(itemToDelete.id)
			setItemToDelete(null)
			setIsDialogOpen(false)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<AdminPageHeader
					title="Управление размерами"
					createUrl={ADMIN_URL.sizes.create()}
					buttonText="Создать новый размер"
				/>

				<AdminDataTable
					data={sizes}
					columns={columns}
					isLoading={isLoading}
					uniqueKey="id"
					onEdit={id => router.push(ADMIN_URL.sizes.put(id))}
					onDelete={(id, name) => handleOpenDeleteDialog(id, name)}
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

export default Sizes
