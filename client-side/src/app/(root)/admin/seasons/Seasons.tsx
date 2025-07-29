'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminSeasons } from '@/hooks/admin/season/useAdminSeasons'
import { ADMIN_URL } from '@/config/urls.constants'
import { Container } from '@/components/container'
import { ISeason } from '@/shared/types/season.interface'
import { AdminDataTable, IColumn } from '@/components/ui/admin/admin-data-table'
import { AdminPageHeader } from '@/components/ui/admin/admin-page-header'
import { AdminDeleteAlert } from '@/components/ui/admin/admin-delete-alert'

const columns: IColumn<ISeason>[] = [
	{
		key: 'name',
		header: 'Название',
		cell: item => <span className="font-medium">{item.name}</span>,
	},
	{
		key: 'slug',
		header: 'URL',
		cell: item => <span>{item.slug}</span>,
	},
]

const Seasons = () => {
	const router = useRouter()
	const { seasons, isLoading, deleteSeason } = useAdminSeasons()

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
			deleteSeason(itemToDelete.slug)
			setItemToDelete(null)
			setIsDialogOpen(false)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<AdminPageHeader
					title="Управление сезонами"
					createUrl={ADMIN_URL.seasons.create()}
					buttonText="Создать новый сезон"
				/>

				<AdminDataTable
					data={seasons}
					columns={columns}
					isLoading={isLoading}
					uniqueKey="slug"
					onEdit={slug => router.push(ADMIN_URL.seasons.put(slug))}
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

export default Seasons
