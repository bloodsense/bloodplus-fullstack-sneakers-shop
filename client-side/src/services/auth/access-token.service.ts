import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export enum Tokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}
interface JwtPayload {
	role: 'USER' | 'ADMIN'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(Tokens.ACCESS_TOKEN)

	return accessToken || null
}

export const saveTokenInStorage = (accessToken: string) => {
	const now = new Date()

	const expiryDate = new Date(now.getTime() + 30 * 60 * 1000)

	Cookies.set(Tokens.ACCESS_TOKEN, accessToken, {
		domain: process.env.APP_DOMAIN,
		sameSite: 'strict',
		expires: expiryDate,
	})
}

export const removeTokenFromStorage = () => {
	Cookies.remove(Tokens.ACCESS_TOKEN)
}

export const isUserAdmin = (): boolean => {
	const accessToken = Cookies.get(Tokens.ACCESS_TOKEN)

	if (!accessToken) {
		return false
	}

	try {
		const decodedToken = jwtDecode<JwtPayload>(accessToken)
		return decodedToken.role === 'ADMIN'
	} catch (error) {
		console.error('Ошибка декодирования токена на клиенте:', error)
		return false
	}
}
