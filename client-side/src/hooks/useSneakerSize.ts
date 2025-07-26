import { useState, useMemo, useEffect } from 'react'
import type { ISneakerSizeStock } from '@/shared/types/sneaker-size-stock.interface'
import { SizeType } from '@/shared/types/size.interface'

export function useSneakerSizes(
	stocks: ISneakerSizeStock[],
	isPopoverOpen: boolean
) {
	const [selectedStock, setSelectedStock] = useState<ISneakerSizeStock | null>(
		null
	)
	const [activeTab, setActiveTab] = useState<SizeType>(SizeType.RU)

	const { ruSizes, euSizes } = useMemo(() => {
		const ru: ISneakerSizeStock[] = []
		const eu: ISneakerSizeStock[] = []

		stocks.forEach(stock => {
			if (stock.size) {
				if (stock.size.type === SizeType.RU) {
					ru.push(stock)
				} else if (stock.size.type === SizeType.EU) {
					eu.push(stock)
				}
			}
		})

		const sortSizes = (a: ISneakerSizeStock, b: ISneakerSizeStock): number => {
			return parseFloat(a.size.value) - parseFloat(b.size.value)
		}

		ru.sort(sortSizes)
		eu.sort(sortSizes)

		return { ruSizes: ru, euSizes: eu }
	}, [stocks])

	useEffect(() => {
		if (isPopoverOpen && selectedStock) {
			setActiveTab(selectedStock.size.type)
		}
	}, [isPopoverOpen, selectedStock])

	const handleSizeSelect = (stock: ISneakerSizeStock) => {
		setSelectedStock(stock)
		setActiveTab(stock.size.type)
	}

	return {
		selectedStock,
		activeTab,
		ruSizes,
		euSizes,
		handleSizeSelect,
		setActiveTab,
	}
}
