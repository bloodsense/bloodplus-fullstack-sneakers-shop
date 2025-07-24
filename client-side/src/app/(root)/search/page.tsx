import { sneakerService } from '@/services/sneaker.service'
import { ISneaker } from '@/shared/types/sneaker.interface'
import { Container } from '@/components/container'
import { SneakerCard } from '@/components/sneaker-card'

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
			<div className="mb-8">
				<div className="flex items-baseline gap-x-3">
					<p className="text-2xl font-bold">
						{searchTerm
							? `Результаты поиска по запросу:`
							: 'Введите запрос для поиска'}
					</p>
					{searchTerm && (
						<p className="text-2xl text-foreground/80">"{searchTerm}"</p>
					)}
				</div>

				{searchTerm && sneakers.length === 0 && (
					<div className="text-left py-10">
						<p className="text-lg text-foreground/60">
							По вашему запросу ничего не найдено
						</p>
					</div>
				)}
			</div>

			{sneakers.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 place-items-center">
					{sneakers.map(sneaker => (
						<SneakerCard key={sneaker.id} sneaker={sneaker} />
					))}
				</div>
			)}
		</Container>
	)
}
