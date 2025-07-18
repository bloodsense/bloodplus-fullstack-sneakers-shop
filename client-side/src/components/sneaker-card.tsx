import { PUBLIC_URL } from '@/config/urls.constants'
import { ISneaker } from '@/shared/types/sneaker.interface'
import Image from 'next/image'
import Link from 'next/link'

interface SneakerCardProps {
	sneaker: ISneaker
}

export const SneakerCard: React.FC<SneakerCardProps> = ({ sneaker }) => {
	return (
		<Link href={PUBLIC_URL.sneakers.watch(sneaker.brand.slug, sneaker.slug)}>
			<div className="flex flex-col items-center rounded-xl">
				<div className="relative w-[200px] h-[180px]">
					<Image
						src={sneaker.images[0]}
						alt={sneaker.name}
						fill
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>
				<h3 className="text-xs pt-2.5">{sneaker.name}</h3>
				<p className="text-xs pt-2.5">{sneaker.price} ₽</p>
			</div>
		</Link>
	)
}
