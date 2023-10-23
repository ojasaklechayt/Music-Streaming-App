import { NextResponse } from 'next/server'
import { AUTH_TOKEN_KEY } from './utils/constants'

const publicPaths = [
    '/',
    '/login',
    '/register'
]

export function middleware(request) {
    const path = request.nextUrl.pathname

    const isPublic = publicPaths.includes(path)

    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value ?? null

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (path === '/logout') {
        request.cookies.delete(AUTH_TOKEN_KEY)
        NextResponse.redirect(new URL('/home', request.nextUrl))
    } else {
        NextResponse.redirect(new URL('/home', request.nextUrl))
    }
}


export const config = {
    matcher: ['/', '/login', '/profile', '/register', '/home', '/logout'],
}
