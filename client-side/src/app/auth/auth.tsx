'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Form } from '@/components/ui/form/form'
import { useAuthForm } from '@/hooks/useAuthForm'
import Image from 'next/image'
import React from 'react'
import { AuthFields } from './AuthFields'
import { SocialMedia } from './SocialMedia'
import { PUBLIC_URL } from '@/config/urls.constants'
import Link from 'next/link'

export const Auth: React.FC = ({}) => {
	const [isRegistration, setIsRegistration] = React.useState(false)

	const { onSubmit, form, isPending } = useAuthForm(isRegistration)

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
			<div className="h-full bg-background hidden lg:flex items-center justify-center">
				<Image
					src="/bloodplus-logo-dark.svg"
					alt="bloodplus-logo-light"
					width={500}
					height={500}
					className="dark:hidden"
				/>
				<Image
					src="/bloodplus-logo-light.svg"
					alt="bloodplus-logo-dark"
					width={500}
					height={500}
					className="hidden dark:block"
				/>
			</div>
			<div className="h-full flex flex-col items-center justify-center bg-foreground/20">
				<Card className="border-none p-10">
					<CardHeader className="text-center w-full">
						<CardTitle className="text-3xl font-bold">
							{isRegistration ? 'Зарегистрируйте аккаунт' : 'Войдите в аккаунт'}
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<AuthFields
									form={form}
									isPending={isPending}
									isRegistration={isRegistration}
								/>
								<Button disabled={isPending} className="w-full h-10">
									{isRegistration ? 'Зарегистрироваться' : 'Войти'}
								</Button>
							</form>
						</Form>
						<SocialMedia className="space-y-3 w-full pt-8" />
					</CardContent>
					<CardFooter className="flex justify-center pt-4 text-sm text-foreground">
						<div className="flex flex-col items-center w-full font-normal text-foreground/50">
							{isRegistration
								? 'Уже зарегистрированы?'
								: 'Не зарегистрированы?'}
							<Button
								variant="link"
								onClick={() => setIsRegistration(!isRegistration)}
								className="cursor-pointer font-medium"
							>
								{isRegistration ? 'Войти' : 'Регистрация'}
							</Button>
						</div>
					</CardFooter>
					{!isRegistration ? (
						<Link
							href={PUBLIC_URL.home()}
							className="text-center text-foreground/50 text-sm"
						>
							Продолжить без учетной записи
						</Link>
					) : null}
				</Card>
			</div>
		</div>
	)
}
