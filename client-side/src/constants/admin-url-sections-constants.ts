import { Palette, Crown, SunSnow, Ruler, ShoppingBag } from 'lucide-react'
import { ADMIN_URL } from '@/config/urls.constants'

export const adminSectionsUrl = [
	{
		title: 'Кроссовки',
		description: 'Управление моделями кроссовок',
		href: ADMIN_URL.sneakers.page(),
		icon: ShoppingBag,
	},
	{
		title: 'Бренды',
		description: 'Добавление и редактирование брендов',
		href: ADMIN_URL.brands.page(),
		icon: Crown,
	},
	{
		title: 'Цвета',
		description: 'Управление доступными цветами',
		href: ADMIN_URL.colors.page(),
		icon: Palette,
	},
	{
		title: 'Размеры',
		description: 'Настройка размерной сетки',
		href: ADMIN_URL.sizes.page(),
		icon: Ruler,
	},
	{
		title: 'Сезоны',
		description: 'Управление коллекциями по сезонам',
		href: ADMIN_URL.seasons.page(),
		icon: SunSnow,
	},
]
