'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { useAdminSizes } from '@/hooks/admin/sizes/useAdminSizes'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
import { Badge } from '@/components/ui/badge'

const Sizes = () => {
	const { sizes, isLoading, deleteSize } = useAdminSizes()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [sizeToDelete, setSizeToDelete] = useState<{
		id: string
		value: string
	} | null>(null)

	const handleOpenDeleteDialog = (id: string, value: string) => {
		setSizeToDelete({ id, value })
		setIsDialogOpen(true)
	}

	const confirmDelete = () => {
		if (sizeToDelete) {
			deleteSize(sizeToDelete.id)
			setSizeToDelete(null)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">Управление размерами</h1>
					<Link href={ADMIN_URL.sizes.create()}>
						<Button>Создать новый размер</Button>
					</Link>
				</div>

				{isLoading ? (
					<p>Загрузка данных...</p>
				) : (
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Значение</TableHead>
									<TableHead>Тип</TableHead>
									<TableHead>
										<span className="sr-only">Действия</span>
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sizes?.length ? (
									sizes.map(size => (
										<TableRow key={size.id}>
											<TableCell className="font-medium">
												{size.value}
											</TableCell>
											<TableCell>
												<Badge variant="outline">{size.type}</Badge>
											</TableCell>
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
														<Link href={ADMIN_URL.sizes.put(size.id)}>
															<DropdownMenuItem className="cursor-pointer">
																Изменить
															</DropdownMenuItem>
														</Link>
														<DropdownMenuItem
															className="text-red-600 cursor-pointer"
															onSelect={e => {
																e.preventDefault()
																handleOpenDeleteDialog(size.id, size.value)
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
							данных размер -{' '}
							<strong className="text-foreground/80">
								{sizeToDelete?.value.toLowerCase()}
							</strong>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setSizeToDelete(null)}>
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

export default Sizes
