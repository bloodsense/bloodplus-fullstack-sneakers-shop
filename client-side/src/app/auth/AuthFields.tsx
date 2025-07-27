import { useState } from 'react'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form/form'
import { Input } from '@/components/ui/form/input'
import { validateEmail } from '@/lib/regex'
import { IAuthForm } from '@/shared/types/auth.interface'
import { UseFormReturn } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

interface Props {
	form: UseFormReturn<IAuthForm, any, undefined>
	isPending: boolean
	isRegistration: boolean
}

export const AuthFields: React.FC<Props> = ({
	form,
	isPending,
	isRegistration,
}) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<>
			{isRegistration && (
				<FormField
					control={form.control}
					name="name"
					rules={{
						required: 'Обязательно укажите Ваше имя',
					}}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Как вас зовут?"
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			)}

			<FormField
				control={form.control}
				name="email"
				rules={{
					required: 'Обязательно укажите почту',
					pattern: {
						value: validateEmail,
						message: 'Введите корректную почту',
					},
				}}
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								{...field}
								placeholder="internet@email.com"
								type="email"
								disabled={isPending}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="password"
				rules={{
					required: 'Обязательно укажите пароль',
					minLength: {
						value: 8,
						message: 'Пароль должен содержать не менее 8 символов',
					},
				}}
				render={({ field }) => (
					<FormItem>
						<div className="relative">
							<FormControl>
								<Input
									{...field}
									placeholder="********"
									type={showPassword ? 'text' : 'password'}
									disabled={isPending}
									className="pr-10"
								/>
							</FormControl>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground cursor-pointer"
								aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</button>
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
