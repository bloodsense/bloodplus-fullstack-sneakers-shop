import Link from 'next/link'
import Image from 'next/image'
import { PUBLIC_URL } from '@/config/urls.constants'

export const Logo = () => {
	return (
		<Link href={PUBLIC_URL.home()} className="mr-10">
			<Image
				src="/bloodplus-logo-dark.svg"
				alt="bloodplus-logo-light"
				width={110}
				height={20}
				className="dark:hidden"
			/>
			<Image
				src="/bloodplus-logo-light.svg"
				alt="bloodplus-logo-dark"
				width={110}
				height={20}
				className="hidden dark:block"
			/>
		</Link>
	)
}
