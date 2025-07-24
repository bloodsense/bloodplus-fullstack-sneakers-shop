import { NextResponse, type NextRequest } from 'next/server'
import { Tokens } from './services/auth/access-token.service'
import { PUBLIC_URL, ADMIN_URL } from './config/urls.constants'
import { jwtDecode } from 'jwt-decode'
import { API_URL, SERVER_URL } from './config/api.constants'

interface JwtPayload {
	userId: string
	email: string
	role: 'USER' | 'ADMIN'
	exp: number
	iat: number
}

export async function middleware(req: NextRequest) {
	const accessToken = req.cookies.get(Tokens.ACCESS_TOKEN)?.value
	const refreshToken = req.cookies.get(Tokens.REFRESH_TOKEN)?.value

	const isAuthPage = req.url.includes(PUBLIC_URL.auth.auth())
	const isLogoutPage = req.url.includes(PUBLIC_URL.auth.logout())
	const isAdminPage = req.url.includes('/admin')

	if (isLogoutPage) {
		return NextResponse.next()
	}

	if (isAuthPage) {
		if (refreshToken) {
			return NextResponse.redirect(new URL(PUBLIC_URL.home(), req.url))
		}
		return NextResponse.next()
	}

	let userRole: 'USER' | 'ADMIN' | null = null

	if (accessToken) {
		try {
			const decodedToken = jwtDecode<JwtPayload>(accessToken)

			if (decodedToken.exp * 1000 > Date.now()) {
				userRole = decodedToken.role
			}
		} catch (error) {
			console.error('Ошибка декодирования accessToken:', error)
		}
	}

	if (!accessToken || !userRole) {
		if (refreshToken) {
			try {
				const refreshResponse = await fetch(
					`${SERVER_URL}${API_URL.auth.accessToken()}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Cookie: `${Tokens.REFRESH_TOKEN}=${refreshToken}`,
						},
					}
				)

				if (refreshResponse.ok) {
					const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
						await refreshResponse.json()

					const response = NextResponse.next()
					response.cookies.set(Tokens.ACCESS_TOKEN, newAccessToken, {
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
					})
					if (newRefreshToken) {
						response.cookies.set(Tokens.REFRESH_TOKEN, newRefreshToken, {
							httpOnly: true,
							secure: process.env.NODE_ENV === 'production',
						})
					}

					try {
						const newDecodedToken = jwtDecode<JwtPayload>(newAccessToken)
						userRole = newDecodedToken.role
					} catch (decodeError) {
						console.error(
							'Ошибка декодирования нового accessToken:',
							decodeError
						)
						userRole = null
					}

					if (isAdminPage && userRole !== 'ADMIN') {
						return NextResponse.redirect(new URL(PUBLIC_URL.home(), req.url))
					}

					return response
				} else {
					const response = NextResponse.redirect(
						new URL(PUBLIC_URL.auth.auth(), req.url)
					)

					response.cookies.delete(Tokens.REFRESH_TOKEN)
					response.cookies.delete(Tokens.ACCESS_TOKEN)
					return response
				}
			} catch (error) {
				console.error('Ошибка обновления токена в middleware:', error)
				const response = NextResponse.redirect(
					new URL(PUBLIC_URL.auth.auth(), req.url)
				)
				response.cookies.delete(Tokens.REFRESH_TOKEN)
				response.cookies.delete(Tokens.ACCESS_TOKEN)
				return response
			}
		} else {
			return NextResponse.redirect(new URL(PUBLIC_URL.auth.auth(), req.url))
		}
	}

	if (isAdminPage && userRole !== 'ADMIN') {
		return NextResponse.redirect(new URL(PUBLIC_URL.home(), req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/profile/:path*', '/auth/:path*', '/admin/:path*'],
}
