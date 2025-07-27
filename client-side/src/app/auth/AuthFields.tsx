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
						<FormControl>
							<Input
								{...field}
								placeholder="********"
								type="password"
								disabled={isPending}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	)
}
