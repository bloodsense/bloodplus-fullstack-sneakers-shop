'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { useAdminBrands } from '@/hooks/admin/brands/useAdminBrands'
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

const Brands = () => {
	const { brands, isLoading, deleteBrand } = useAdminBrands()
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [brandToDelete, setBrandToDelete] = useState<{
		slug: string
		name: string
	} | null>(null)

	const handleOpenDeleteDialog = (slug: string, name: string) => {
		setBrandToDelete({ slug, name })
		setIsDialogOpen(true)
	}

	const confirmDelete = () => {
		if (brandToDelete) {
			deleteBrand(brandToDelete.slug)
			setBrandToDelete(null)
		}
	}

	return (
		<Container>
			<div className="p-4 md:p-8">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">Управление брендами</h1>
					<Link href={ADMIN_URL.brands.create()}>
						<Button>Создать новый бренд</Button>
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
								{brands?.length ? (
									brands.map(brand => (
										<TableRow key={brand.id}>
											<TableCell className="font-medium">
												{brand.name}
											</TableCell>
											<TableCell>{brand.slug}</TableCell>
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
														<Link href={ADMIN_URL.brands.put(brand.slug)}>
															<DropdownMenuItem className="cursor-pointer">
																Изменить
															</DropdownMenuItem>
														</Link>
														<DropdownMenuItem
															className="text-red-600 cursor-pointer"
															onSelect={e => {
																e.preventDefault()
																handleOpenDeleteDialog(brand.slug, brand.name)
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
											Нет результатов.
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
							данных бренд -{' '}
							<strong className="text-foreground/80">
								{brandToDelete?.name.toLowerCase()}
							</strong>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setBrandToDelete(null)}>
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

export default Brands
