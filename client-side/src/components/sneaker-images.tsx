import { FC } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

interface SneakerGalleryProps {
	images: string[]
	name: string
	setApi: (api: CarouselApi) => void
}

export const SneakerImages: FC<SneakerGalleryProps> = ({
	images,
	name,
	setApi,
}) => {
	return (
		<Carousel
			setApi={setApi}
			opts={{ loop: true }}
			plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
			className="w-full"
		>
			<CarouselContent>
				{images.map((imageUrl, index) => (
					<CarouselItem key={index}>
						<div className="relative aspect-[4/3] overflow-hidden rounded-lg">
							<Image
								src={imageUrl}
								alt={`${name} - фото ${index + 1}`}
								fill
								className="object-cover"
								priority={index === 0}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{images.length > 1 && (
				<>
					<CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2" />
					<CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2" />
				</>
			)}
		</Carousel>
	)
}
