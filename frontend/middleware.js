import { NextResponse } from 'next/server'

export function middleware(request) {
    const path = request.nextUrl.pathname


    const isPublic = path === '/login' || path === '/register' || path === '/'

    const token = request.cookies.get('token')?.value || ''

    if (isPublic && token) {
        return NextResponse.redirect(new URL('/home', request.nextUrl))
    }
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
}


export const config = {
    matcher: ['/', '/login', '/profile', '/register', '/home'],
}