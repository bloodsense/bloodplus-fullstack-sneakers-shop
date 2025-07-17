import { Button } from '@/components/ui/button'
import { SERVER_URL } from '@/config/api.constants'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaYandex } from 'react-icons/fa'

interface Props {
	className?: string
}

export const SocialMedia: React.FC<Props> = ({ className }) => {
	const router = useRouter()

	return (
		<div className={className}>
			<Button
				className="w-full"
				variant="outline"
				size="sm"
				onClick={() => router.push(`${SERVER_URL}/api/auth/google`)}
			>
				<FcGoogle />
				Продолжить через Google
			</Button>

			<Button
				className="w-full"
				variant="outline"
				size="sm"
				onClick={() => router.push(`${SERVER_URL}/api/auth/yandex`)}
			>
				<FaYandex color="#FC3F1D" />
				Продолжить через Яндекс
			</Button>
		</div>
	)
}
