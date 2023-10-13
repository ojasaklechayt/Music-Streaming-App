import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

const authPath = ['/', '/login', '/register'];
const protectedRoutes = ['/home', '/profile'];

export async function middleware(request) {
    const token = getCookie("token", {
        req: request,
    });

    const response = await fetch("https://music-streaming-app.onrender.com/users/verify", {
        headers: new Headers({
            Authorization: "Bearer " + token,
        }),
    });
    const data = await response.json();

    console.log(data);
    if (token) {
        console.log("token: ", token);
    } else {
        console.log("no token");
    }

    return NextResponse.next(null, { status: 401 });
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

export default middleware;
