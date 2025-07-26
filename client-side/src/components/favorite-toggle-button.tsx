import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

interface FavoriteToggleButtonProps {
	isFavorite: boolean
	isLoading: boolean
	onClick: () => void
}

export const FavoriteToggleButton: FC<FavoriteToggleButtonProps> = ({
	isFavorite,
	isLoading,
	onClick,
}) => {
	return (
		<Button
			variant="outline"
			className="w-full flex items-center justify-center gap-2"
			onClick={onClick}
			disabled={isLoading}
		>
			<Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
			{isFavorite ? 'В избранном' : 'Добавить в избранное'}
		</Button>
	)
}
