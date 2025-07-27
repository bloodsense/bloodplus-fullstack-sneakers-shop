'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/urls.constants'

export default function NotFound() {
	const [mounted, setMounted] = useState(false)
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	const imageSrc =
		resolvedTheme === 'dark' ? '/not-found-dark.svg' : '/not-found-light.svg'

	return (
		<Container className="flex h-screen min-h-[600px] items-center justify-center">
			<div className="flex w-full max-w-5xl items-center justify-center gap-16 px-4">
				<div className="flex max-w-md flex-col items-start text-left">
					<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
						Страница не найдена
					</h1>
					<p className="mt-6 text-base leading-7 text-foreground/70">
						Проверьте корректность введённого адреса или повторите попытку позже
					</p>
					<div className="pt-10">
						<Button asChild>
							<Link href={PUBLIC_URL.home()}>
								<span aria-hidden="true" className="mr-1">
									←
								</span>
								На главную
							</Link>
						</Button>
					</div>
				</div>

				<div className="relative hidden h-[400px] w-[400px] lg:block">
					<p
						className="absolute -top-16 -left-10 text-[250px] font-bold text-foreground/5 -z-10"
						aria-hidden="true"
					>
						404
					</p>

					{mounted && (
						<Image
							src={imageSrc}
							alt="Человек смотрит в телескоп"
							width={400}
							height={400}
							className="relative"
						/>
					)}
				</div>
			</div>
		</Container>
	)
}
