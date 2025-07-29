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
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { AdminDataTableSkeleton } from '@/components/skeletons/admin-data-table-skeleton'

export interface IColumn<T> {
	key: keyof T | string
	header: string
	cell: (item: T) => React.ReactNode
}

interface IAdminDataTableProps<
	T extends { id: string; name?: string; value?: string; slug?: string }
> {
	data: T[] | undefined
	columns: IColumn<T>[]
	isLoading: boolean
	onEdit: (slugOrId: string) => void
	onDelete: (slugOrId: string, name: string) => void
	uniqueKey: 'id' | 'slug'
}

export const AdminDataTable = <
	T extends { id: string; name?: string; value?: string; slug?: string }
>({
	data,
	columns,
	isLoading,
	onEdit,
	onDelete,
	uniqueKey,
}: IAdminDataTableProps<T>) => {
	if (isLoading) {
		return <AdminDataTableSkeleton columnCount={columns.length} />
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{columns.map(col => (
							<TableHead className="p-4" key={String(col.key)}>
								{col.header}
							</TableHead>
						))}
						<TableHead>
							<span className="sr-only">Действия</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.length ? (
						data.map(item => (
							<TableRow key={item.id}>
								{columns.map(col => (
									<TableCell key={`${item.id}-${String(col.key)}`} className='p-4'>
										{col.cell(item)}
									</TableCell>
								))}
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button size="icon" variant="ghost">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem
												className="cursor-pointer"
												onClick={() => onEdit(item[uniqueKey]!)}
											>
												Изменить
											</DropdownMenuItem>
											<DropdownMenuItem
												className="text-red-600 cursor-pointer"
												onSelect={e => {
													e.preventDefault()
													onDelete(
														item[uniqueKey]!,
														item.name || item.value || ''
													)
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
							<TableCell
								colSpan={columns.length + 1}
								className="h-24 text-center"
							>
								Нет результатов
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
