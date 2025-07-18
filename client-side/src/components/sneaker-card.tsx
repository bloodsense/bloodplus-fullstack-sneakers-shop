import Image from 'next/image'
import Link from 'next/link'

interface Props {
	className?: string
}

export const SneakerCard: React.FC<Props> = ({ className }) => {
	return (
		<Link href="/">
			<div className="flex flex-col items-center rounded-xl">
				<div className="relative w-[200px] h-[180px]">
					<Image
						src="/new-balance.jpg"
						alt="aaa"
						fill
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>
				<h3 className="text-xs pt-2.5">New Balance 500</h3>
				<p className="text-xs pt-2.5">10000 ₽</p>
			</div>
		</Link>
	)
}
