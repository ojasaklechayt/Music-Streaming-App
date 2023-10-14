import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

const authPath = ['/', '/login', '/register'];
const protectedRoutes = ['/home', '/profile'];

export async function middleware(request) {
    const token = getCookie(request, 'token');

    console.log({ token });
    const response = await fetch("http://localhost:5000/users/verify", {
        headers: new Headers({
            Authorization: "Bearer " + token,
        }),
    });

    // console.log(response);
    const data = await response.json();

    // console.log(data);

    return NextResponse.next();
    // if (!token) {
    //     if (authPath.includes(request.url)) {
    //         return NextResponse.next();
    //     } else {
    //         return NextResponse.next(null, { status: 401 });
    //     }
    // }

    // try {
    //     const backendURL = 'https://music-streaming-app.onrender.com/'; // Replace with the actual URL
    //     const response = await fetch(`${backendURL}/verify-token?token=${token}`);

    //     if (response.status === 200) {
    //         if (protectedRoutes.includes(request.url)) {
    //             return NextResponse.next();
    //         } else {
    //             return NextResponse.next(null, { status: 401 });
    //         }
    //     } else {
    //         if (authPath.includes(request.url)) {
    //             return NextResponse.next();
    //         } else {
    //             return NextResponse.next(null, { status: 401 });
    //         }
    //     }
    // } catch (error) {
    //     console.error(error);
    //     return new NextResponse(null, { status: 500 });
    // }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};