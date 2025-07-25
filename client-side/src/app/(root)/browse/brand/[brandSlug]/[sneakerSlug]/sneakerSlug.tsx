'use client'

import { Container } from '@/components/container'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { sneakerService } from '@/services/sneaker.service'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Autoplay from 'embla-carousel-autoplay'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { BadgeAlert, BadgeCheck, ChevronDown } from 'lucide-react'
import { useEffect, useState, type FC, type ReactNode } from 'react'

// Вспомогательный компонент для строк в таблице характеристик
interface ICharacteristicRowProps {
	label: string
	value: ReactNode
}

const CharacteristicRow: FC<ICharacteristicRowProps> = ({ label, value }) => (
	<div className="grid grid-cols-2 items-center border-t border-border/60 py-3 text-sm">
		<p className="text-foreground/60">{label}</p>
		<p className="font-medium">{value || 'Отсутствует'}</p>
	</div>
)

export const Sneaker = () => {
	const params = useParams<{ brandSlug: string; sneakerSlug: string }>()
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)

	const {
		data: sneaker,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['sneaker', params.brandSlug, params.sneakerSlug],
		queryFn: () =>
			sneakerService.watchSneakerByBrand(params.brandSlug, params.sneakerSlug),
		enabled: !!params.brandSlug && !!params.sneakerSlug,
	})

	useEffect(() => {
		if (!api) return
		setCurrent(api.selectedScrollSnap() + 1)
		const onSelect = () => setCurrent(api.selectedScrollSnap() + 1)
		api.on('select', onSelect)
		return () => {
			api.off('select', onSelect)
		}
	}, [api])

	if (isLoading)
		return <Container className="pt-7.5">Загрузка данных...</Container>
	if (isError)
		return (
			<Container className="pt-7.5">
				Ошибка при загрузке данных о кроссовке.
			</Container>
		)
	if (!sneaker)
		return (
			<Container className="pt-7.5">
				Информация о кроссовке не найдена.
			</Container>
		)

	const handleThumbnailClick = (index: number) => {
		if (api) api.scrollTo(index)
	}

	return (
		<Container className="pt-7.5">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href="/">Главная</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={`/browse/brand/${sneaker.brand.slug}`}>
								{sneaker.brand.name}
							</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{sneaker.name}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<div className="pt-4 grid grid-cols-1 lg:grid-cols-2 items-start gap-x-10 gap-y-10 mb-16">
				<div className="w-full">
					<Carousel
						setApi={setApi}
						opts={{ loop: true }}
						plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
						className="w-full"
					>
						<CarouselContent>
							{sneaker.images.map((imageUrl, index) => (
								<CarouselItem key={index}>
									<div className="relative aspect-[4/3] overflow-hidden rounded-lg">
										<Image
											src={imageUrl}
											alt={`${sneaker.name} - фото ${index + 1}`}
											fill
											className="object-cover"
											priority={index === 0}
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						{sneaker.images.length > 1 && (
							<>
								<CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2" />
								<CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2" />
							</>
						)}
					</Carousel>
				</div>

				{/* Правая колонка: Информация о товаре */}
				<div className="w-full bg-foreground/5 p-6 h-full rounded-lg">
					<h2 className="font-bold text-xl mb-2">{sneaker.name}</h2>
					<div className="flex items-center gap-2 mb-2">
						<p className="text-foreground/60">{sneaker.color.value}</p>
						{sneaker.color.hex && (
							<span
								className="inline-block w-3 h-3 rounded-full border"
								style={{ backgroundColor: sneaker.color.hex }}
								title={`Код цвета: ${sneaker.color.hex}`}
							/>
						)}
					</div>
					<Popover>
						<PopoverTrigger asChild className="mb-4">
							<Button
								variant="outline"
								className="flex justify-between h-10 w-full"
							>
								Размер
								<ChevronDown />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full">Выберите размер</PopoverContent>
					</Popover>
					<div className="flex justify-between items-center">
						<p className="text-xl">{sneaker.price.toLocaleString('ru-RU')} ₽</p>
						<Button>Добавить в корзину</Button>
					</div>
					{sneaker.images.length > 1 && (
						<div className="mt-6 flex justify-center gap-4 mb-6">
							{sneaker.images.map((imageUrl, index) => (
								<button
									key={index}
									onClick={() => handleThumbnailClick(index)}
									className="relative w-30 h-26 rounded-md overflow-hidden"
								>
									<Image
										src={imageUrl}
										alt={`Миниатюра ${index + 1}`}
										fill
										className="object-cover"
									/>
									{current !== index + 1 && (
										<div className="absolute inset-0 bg-white/50 dark:bg-black/50 transition-opacity"></div>
									)}
								</button>
							))}
						</div>
					)}
					<div className="bg-foreground/5 rounded-lg p-2">
						<div className="flex items-center gap-2 text-xs">
							<BadgeCheck size={30} />
							<p>
								Проверено. Наши сотрудники проверили товар и убедились в
								подлинности. Вы с уверенностью можете приобрести это
							</p>
						</div>
						<div className="flex items-center gap-2 text-xs pt-2">
							<BadgeAlert size={30} />
							<p>
								Мы отвечаем за каждую проданную модель на bloodplus. Если мы
								допустили ошибку, напишите нам, мы ее исправим
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* 2. ИСПРАВЛЕНО: Нижний блок. Убраны лишние обертки для правильного выравнивания по ширине */}

			{/* Секция Описания */}
			<section className="mb-12">
				<h3 className="text-xl font-semibold mb-4">Описание модели</h3>
				<div className="text-foreground/80 leading-relaxed space-y-4">
					{sneaker.description.split('\n').map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			</section>

			{/* Секция Характеристик */}
			<section className="pt-8">
				<h3 className="text-xl font-semibold mb-4">Характеристики</h3>

				<div className="mb-6">
					<h4 className="font-semibold mb-2">Общее</h4>
					<CharacteristicRow label="Пол" value={sneaker.sneakerInfo?.gender} />
					<CharacteristicRow label="Сезон" value={sneaker.season.name} />
					<CharacteristicRow
						label="Защита от влаги"
						value={sneaker.sneakerInfo?.protection}
					/>
				</div>

				<div>
					<h4 className="font-semibold mb-2">Дополнительно</h4>
					<CharacteristicRow
						label="Гарантия подлинности товара"
						value={sneaker.sneakerInfo?.warranty}
					/>
					<CharacteristicRow
						label="Срок гарантии"
						value={sneaker.sneakerInfo?.warrantyTime}
					/>
					<CharacteristicRow
						label="Страна производства"
						value={sneaker.sneakerInfo?.country}
					/>
					<div className="border-b border-border/60">
						<CharacteristicRow
							label="Код товара"
							value={sneaker.sneakerInfo?.code}
						/>
					</div>
				</div>
			</section>
		</Container>
	)
}
