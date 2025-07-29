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

interface IAdminDeleteAlertProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	onConfirm: () => void
	entityName?: string
}

export const AdminDeleteAlert = ({
	isOpen,
	onOpenChange,
	onConfirm,
	entityName,
}: IAdminDeleteAlertProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
					<AlertDialogDescription>
						Это действие необратимо
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Отмена</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>Удалить</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
