import { FC, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { BadgeAlert, BadgeCheck, ChevronDown } from 'lucide-react'
import type { ISneaker } from '@/shared/types/sneaker.interface'
import type { ISneakerSizeStock } from '@/shared/types/sneaker-size-stock.interface'
import { useSneakerSizes } from '@/hooks/useSneakerSize'
import { SneakerSizeSelector } from './sneaker-size-selector'

interface SneakerPurchaseInfoProps {
	sneaker: ISneaker
	current: number
	onThumbnailClick: (index: number) => void
}

export const SneakerPurchaseInfo: FC<SneakerPurchaseInfoProps> = ({
	sneaker,
	current,
	onThumbnailClick,
}) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	const {
		selectedStock,
		activeTab,
		ruSizes,
		euSizes,
		handleSizeSelect,
		setActiveTab,
	} = useSneakerSizes(sneaker.stocks, isPopoverOpen)

	const handleSelectAndClose = (stock: ISneakerSizeStock) => {
		handleSizeSelect(stock)
		setIsPopoverOpen(false)
	}

	return (
		<div className="w-full bg-foreground/5 p-6 h-full rounded-lg">
			<div className="flex items-center gap-2">
				<h2 className="font-bold text-xl mb-2">{sneaker.name}</h2>
			</div>
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
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild className="mb-4">
					<Button
						variant="outline"
						className="flex justify-between h-10 w-full"
						disabled={sneaker.stocks.every(s => s.quantity === 0)}
					>
						{selectedStock
							? `${selectedStock.size.type} ${selectedStock.size.value}`
							: 'Размер'}
						<ChevronDown
							className={`transition-transform duration-200 ${
								isPopoverOpen ? 'rotate-180' : ''
							}`}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
					<SneakerSizeSelector
						ruSizes={ruSizes}
						euSizes={euSizes}
						selectedStock={selectedStock}
						activeTab={activeTab}
						onTabChange={setActiveTab}
						onSizeSelect={handleSelectAndClose}
					/>
				</PopoverContent>
			</Popover>
			<div className="flex justify-between items-center">
				<p className="text-xl">{sneaker.price.toLocaleString('ru-RU')} ₽</p>
				<Button disabled={!selectedStock}>Добавить в корзину</Button>
			</div>
			{sneaker.images.length > 1 && (
				<div className="mt-6 flex justify-center gap-4 mb-10">
					{sneaker.images.map((imageUrl, index) => (
						<button
							key={index}
							onClick={() => onThumbnailClick(index)}
							className="relative w-30 h-20 rounded-md overflow-hidden cursor-pointer"
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
					<BadgeCheck size={20} />
					<p>
						Проверено. Наши сотрудники проверили товар и убедились в подлинности
					</p>
				</div>
				<div className="flex items-center gap-2 text-xs pt-2">
					<BadgeAlert size={20} />
					<p>
						Мы отвечаем за каждую проданную модель. Если мы допустили ошибку,
						напишите нам
					</p>
				</div>
			</div>
		</div>
	)
}
