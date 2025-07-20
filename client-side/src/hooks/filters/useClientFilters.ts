import React from 'react'

function toggleArrayItem<T>(array: T[], item: T): T[] {
	if (array.includes(item)) {
		return array.filter(i => i !== item)
	} else {
		return [...array, item]
	}
}

export const useFilters = () => {
	const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
	const [selectedSeasons, setSelectedSeasons] = React.useState<string[]>([])
	const [selectedColors, setSelectedColors] = React.useState<string[]>([])
	const [selectedGenders, setSelectedGenders] = React.useState<string[]>([])

	const handleBrandChange = (brandId: string) => {
		setSelectedBrands(prev => toggleArrayItem(prev, brandId))
	}

	const handleSeasonChange = (seasonId: string) => {
		setSelectedSeasons(prev => toggleArrayItem(prev, seasonId))
	}

	const handleColorChange = (colorId: string) => {
		setSelectedColors(prev => toggleArrayItem(prev, colorId))
	}

	const handleGenderChange = (gender: string) => {
		setSelectedGenders(prev => toggleArrayItem(prev, gender))
	}

	return {
		selectedBrands,
		selectedSeasons,
		selectedColors,
		selectedGenders,
		handleBrandChange,
		handleSeasonChange,
		handleColorChange,
		handleGenderChange,
	}
}
