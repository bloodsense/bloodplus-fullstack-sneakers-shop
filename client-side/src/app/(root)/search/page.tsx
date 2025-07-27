import { sneakerService } from '@/services/sneaker.service'
import { ISneaker } from '@/shared/types/sneaker.interface'
import { Container } from '@/components/container'
import { SearchResultList } from '@/components/search-result-list'

interface SearchPageProps {
	searchParams: {
		q?: string
	}
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const searchTerm = searchParams.q || ''

	let sneakers: ISneaker[] = []

	if (searchTerm) {
		sneakers = await sneakerService.searchSneakers(searchTerm)
	}

	return (
		<Container className="pt-10 mb-10">
			<div className="mb-10">
				<div className="flex items-baseline gap-x-1 justify-center">
					<p>
						{searchTerm
							? `Результаты поиска по запросу:`
							: 'Введите запрос для поиска'}
					</p>
					{searchTerm && <p className="text-foreground/80">{searchTerm}</p>}
				</div>
				{searchTerm && sneakers.length === 0 && (
					<div className="text-left pt-10">
						<p className="text-foreground/50 text-center p-80 bg-foreground/5 rounded-lg">
							Ничего не найдено
						</p>
					</div>
				)}
			</div>
			{sneakers.length > 0 && <SearchResultList sneakers={sneakers} />}
		</Container>
	)
}
