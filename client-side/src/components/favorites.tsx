import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from './ui/button'
import { PUBLIC_URL } from '@/config/urls.constants'

interface Props {
	className?: string
}

export const Favorites: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('flex', className)}>
			<Link href={PUBLIC_URL.sneakers.favorites()} className="mr-10 text-xs">
				<p>Избранное</p>
			</Link>
		</div>
	)
}
