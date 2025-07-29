import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

interface IAdminDataTableSkeletonProps {
	columnCount: number
	rowCount?: number
}

export const AdminDataTableSkeleton = ({
	columnCount,
	rowCount = 10,
}: IAdminDataTableSkeletonProps) => {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						{Array.from({ length: columnCount }).map((_, i) => (
							<TableHead key={i} className="p-4">
								<Skeleton className="h-5 w-24" />
							</TableHead>
						))}
						<TableHead className="w-[80px]">
							<Skeleton className="h-5 w-16" />
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: rowCount }).map((_, rowIndex) => (
						<TableRow key={rowIndex}>
							{Array.from({ length: columnCount }).map((_, cellIndex) => (
								<TableCell key={cellIndex} className="p-4">
									<Skeleton className="h-5 w-full" />
								</TableCell>
							))}
							<TableCell>
								<Skeleton className="h-8 w-8" />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
