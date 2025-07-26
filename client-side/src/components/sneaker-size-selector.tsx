import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ISneakerSizeStock } from '@/shared/types/sneaker-size-stock.interface'
import { SizeType } from '@/shared/types/size.interface'

interface SneakerSizeSelectorProps {
	ruSizes: ISneakerSizeStock[]
	euSizes: ISneakerSizeStock[]
	selectedStock: ISneakerSizeStock | null
	activeTab: SizeType
	onTabChange: (tab: SizeType) => void
	onSizeSelect: (stock: ISneakerSizeStock) => void
}

export const SneakerSizeSelector: FC<SneakerSizeSelectorProps> = ({
	ruSizes,
	euSizes,
	selectedStock,
	activeTab,
	onTabChange,
	onSizeSelect,
}) => {
	return (
		<Tabs
			value={activeTab}
			onValueChange={value => onTabChange(value as SizeType)}
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value={SizeType.RU} disabled={ruSizes.length === 0}>
					RU
				</TabsTrigger>
				<TabsTrigger value={SizeType.EU} disabled={euSizes.length === 0}>
					EU
				</TabsTrigger>
			</TabsList>
			<TabsContent value={SizeType.RU}>
				<div className="p-4 grid grid-cols-4 gap-2">
					{ruSizes.map(stock => (
						<Button
							key={stock.sizeId}
							variant={
								selectedStock?.sizeId === stock.sizeId ? 'default' : 'outline'
							}
							onClick={() => onSizeSelect(stock)}
							disabled={stock.quantity === 0}
						>
							{stock.size.value}
						</Button>
					))}
				</div>
			</TabsContent>
			<TabsContent value={SizeType.EU}>
				<div className="p-4 grid grid-cols-4 gap-2">
					{euSizes.map(stock => (
						<Button
							key={stock.sizeId}
							variant={
								selectedStock?.sizeId === stock.sizeId ? 'default' : 'outline'
							}
							onClick={() => onSizeSelect(stock)}
							disabled={stock.quantity === 0}
						>
							{stock.size.value}
						</Button>
					))}
				</div>
			</TabsContent>
		</Tabs>
	)
}
