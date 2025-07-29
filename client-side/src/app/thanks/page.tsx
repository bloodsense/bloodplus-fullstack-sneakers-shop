import Link from 'next/link'
import { Container } from '@/components/container'
import { Check, MoveLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PUBLIC_URL } from '@/config/urls.constants'

const ThanksPage = () => {
	return (
		<Container>
			<div className="flex items-center justify-center min-h-screen">
				<div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-foreground/2 w-200 border h-150">
					<div className="flex flex-col items-center gap-1">
						<p className="text-3xl font-bold">Спасибо!</p>
						<p className="text-lg"> Ваш заказ был успешно оформлен!</p>
					</div>

					<p className="text-center max-w-150 text-foreground/50 mb-5">
						На электронную почту, указанную в Вашем профиле, была отправлена
						дополнительная информация по заказу
					</p>
					<div className="flex flex-col items-center gap-3">
						<Button variant="default" className="w-100">
							<Link href={PUBLIC_URL.home()}>
								<div className="flex items-center gap-2">
									<MoveLeft />
									На главную
								</div>
							</Link>
						</Button>
						<Button variant="secondary" className="w-100">
							<Link href={PUBLIC_URL.profile()}>
								<div className="flex items-center gap-2">
									<MoveLeft />В профиль
								</div>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default ThanksPage
