import {
	formatDateTime,
	getOrderStatusStyles,
	getRussianOrderStatus,
} from '@/lib/formatters'
import { IOrderItem } from '@/shared/types/order-item.interface'
import { IOrder } from '@/shared/types/order.interface'
import Image from 'next/image'

interface CardOrderItemProps {
	order: IOrder
}

export const CardOrderItem: React.FC<CardOrderItemProps> = ({ order }) => {
	return (
		<li className="flex flex-col rounded-lg border shadow-sm transition-shadow hover:shadow-md bg-foreground/5">
			<div className="flex items-center justify-between border-b px-5 pt-5 pb-3">
				<h3 className="text-lg">Заказ #{order.id}</h3>
				<p className="text-sm text-foreground/50">
					{formatDateTime(order.createdAt)}
				</p>
			</div>

			<div className="space-y-3 px-5 py-4">
				{order.items?.map((item: IOrderItem) => (
					<div key={item.id} className="flex items-center gap-4">
						<div className="relative h-16 w-22 flex-shrink-0 overflow-hidden rounded-md bg-muted">
							{item.sneakerSizeStock?.sneaker?.images?.[0] && (
								<Image
									src={item.sneakerSizeStock.sneaker.images[0]}
									alt={
										item.sneakerSizeStock.sneaker.name || 'Изображение товара'
									}
									fill
									className="object-cover"
								/>
							)}
						</div>
						<div className="flex-grow">
							<p className="font-medium">
								{item.sneakerSizeStock?.sneaker?.name}
							</p>
							<p className="text-sm text-foreground/50">
								{item.sneakerSizeStock?.size?.type}{' '}
								{item.sneakerSizeStock?.size?.value}
							</p>
							<p className="text-sm text-foreground/50">
								{item.price.toLocaleString('ru-RU')} ₽
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="flex items-end justify-between border-t px-5 pt-4 pb-5">
				<p className="text-lg">{order.totalAmount.toLocaleString('ru-RU')} ₽</p>
				<span
					className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusStyles(
						order.status
					)}`}
				>
					{getRussianOrderStatus(order.status)}
				</span>
			</div>
		</li>
	)
}
