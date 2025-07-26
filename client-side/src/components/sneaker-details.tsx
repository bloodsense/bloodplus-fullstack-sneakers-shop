import { FC } from 'react'
import type { ISneaker } from '@/shared/types/sneaker.interface'
import { CharacteristicRow } from './charasteristic-row'

interface SneakerDetailsProps {
	sneaker: ISneaker
}

export const SneakerDetails: FC<SneakerDetailsProps> = ({ sneaker }) => {
	return (
		<>
			<section className="">
				<h3 className="text-xl font-semibold mb-2">Описание модели</h3>
				<div className="text-foreground/80 leading-relaxed space-y-4">
					{sneaker.description.split('\n').map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			</section>

			<section className="pt-8 mb-12">
				<h3 className="text-xl font-semibold mb-4">Характеристики</h3>
				<div className="mb-6">
					<h4 className="mb-2">Общее</h4>
					<CharacteristicRow label="Пол" value={sneaker.sneakerInfo?.gender} />
					<CharacteristicRow label="Сезон" value={sneaker.season.name} />
					<CharacteristicRow
						label="Защита от влаги"
						value={sneaker.sneakerInfo?.protection}
					/>
				</div>
				<div>
					<h4 className="mb-2">Дополнительно</h4>
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
		</>
	)
}
