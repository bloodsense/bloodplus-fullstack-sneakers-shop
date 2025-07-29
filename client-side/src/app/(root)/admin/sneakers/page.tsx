import { NO_INDEX_PAGE } from "@/constants/seo-constants"
import { Metadata } from "next"
import Sneakers from "./Sneakers"

export const metadata: Metadata = {
	title: 'Админ-панель | Кроссовки',
	...NO_INDEX_PAGE,
}
export default function SneakersPage() {
	return <Sneakers />
}
