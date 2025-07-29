'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
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

import { useAdminColors } from '@/hooks/admin/colors/useAdminColors'
import { ADMIN_URL } from '@/config/urls.constants'
import { Container } from '@/components/container'

const Colors = () => {
	const { colors, isLoading, deleteColor } = useAdminColors()

	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [colorToDelete, setColorToDelete] = useState<{
		slug: string
		value: string
	} | null>(null)

	const handleOpenDeleteDialog = (slug: string, value: string) => {
		setColorToDelete({ slug, value })
		setIsDialogOpen(true)
	}

	const confirmDelete = () => {
		if (colorToDelete) {
			deleteColor(colorToDelete.slug)
			setColorToDelete(null)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">Управление цветами</h1>
					<Link href={ADMIN_URL.colors.create()}>
						<Button>Создать новый цвет</Button>
					</Link>
				</div>

				{isLoading ? (
					<p>Загрузка данных...</p>
				) : (
					<div className="rounded-md border">
						<Table>
							<TableHeader></TableHeader>
							<TableBody>
								{colors?.length ? (
									colors.map(color => (
										<TableRow key={color.id}>
											<TableCell>
												<div
													style={{ backgroundColor: color.hex }}
													className="w-8 h-8 rounded-full border"
												/>
											</TableCell>
											<TableCell className="font-medium">
												{color.value}
											</TableCell>
											<TableCell>{color.hex}</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															aria-haspopup="true"
															size="icon"
															variant="ghost"
														>
															<MoreHorizontal className="h-4 w-4" />
															<span className="sr-only">Toggle menu</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<Link href={ADMIN_URL.colors.put(color.slug)}>
															<DropdownMenuItem className="cursor-pointer">
																Изменить
															</DropdownMenuItem>
														</Link>
														<DropdownMenuItem
															className="text-red-600 cursor-pointer"
															onSelect={e => {
																e.preventDefault()
																handleOpenDeleteDialog(color.slug, color.value)
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
										<TableCell colSpan={4} className="h-24 text-center">
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
								{colorToDelete?.value.toLowerCase()}
							</strong>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setColorToDelete(null)}>
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

export default Colors
