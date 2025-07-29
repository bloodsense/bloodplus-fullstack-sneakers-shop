'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ADMIN_URL } from '@/config/urls.constants'
import { Container } from '@/components/container'
import { useAdminSeasons } from '@/hooks/admin/season/useAdminSeasons'

const Seasons = () => {
	const { seasons, isLoading, deleteSeason } = useAdminSeasons()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [seasonToDelete, setSeasonToDelete] = useState<{
		slug: string
		name: string
	} | null>(null)

	const handleOpenDeleteDialog = (slug: string, name: string) => {
		setSeasonToDelete({ slug, name })
		setIsDialogOpen(true)
	}

	const confirmDelete = () => {
		if (seasonToDelete) {
			deleteSeason(seasonToDelete.slug)
			setSeasonToDelete(null)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">Управление сезонами</h1>
					<Link href={ADMIN_URL.seasons.create()}>
						<Button>Создать новый сезон</Button>
					</Link>
				</div>

				{isLoading ? (
					<p>Загрузка данных...</p>
				) : (
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Название</TableHead>
									<TableHead>URL</TableHead>
									<TableHead>
										<span className="sr-only">Действия</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{seasons?.length ? (
									seasons.map(season => (
										<TableRow key={season.id}>
											<TableCell className="font-medium">
												{season.name}
											</TableCell>
											<TableCell>{season.slug}</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															aria-haspopup="true"
															size="icon"
															variant="ghost"
														>
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuLabel>Действия</DropdownMenuLabel>
														<Link href={ADMIN_URL.seasons.put(season.slug)}>
															<DropdownMenuItem className="cursor-pointer">
																Изменить
															</DropdownMenuItem>
														</Link>
														<DropdownMenuItem
															className="text-red-600 cursor-pointer"
															onSelect={e => {
																e.preventDefault()
																handleOpenDeleteDialog(season.slug, season.name)
															}}
														>
															Удалить
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={3} className="h-24 text-center">
											Нет результатов
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				)}
			</div>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
						<AlertDialogDescription>
							Это действие невозможно отменить. Вы собираетесь удалить с базы
							данных цвет -{' '}
							<strong className="text-foreground/80">
								{seasonToDelete?.name.toLowerCase()}
							</strong>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setSeasonToDelete(null)}>
							Отмена
						</AlertDialogCancel>
						<AlertDialogAction onClick={confirmDelete}>
							Удалить
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Container>
	)
}

export default Seasons
