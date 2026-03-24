import { NextRequest, NextResponse } from 'next/server'
import { getToken } from './utils/getUser'
import { cookies } from 'next/headers'
export async function middleware(req: NextRequest, res: NextResponse) {
  const AUTH: string = process.env.NEXT_PUBLIC_AUTH !== undefined ? process.env.NEXT_PUBLIC_AUTH : ""
  const myURL = process.env.NEXT_PUBLIC_URL || "/"
  if (req.nextUrl.pathname.startsWith('/')) {
    const response = NextResponse.next()
    const session = response.cookies.get("movieSession")?.value || ""
    if (session !== "") {
      console.log(session)
    }
  }
  if (req.nextUrl.pathname.startsWith('/approved')) {
    const token = req.nextUrl.searchParams.get("request_token")
    const request_token: string = token !== null ? token : ""
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: AUTH
      },
      body: JSON.stringify({ request_token })
    };

    const request = await fetch('https://api.themoviedb.org/3/authentication/session/new', options)

    const { session_id } = await request.json()
    const oneDay = 24 * 60 * 60 * 1000
    const response = NextResponse.redirect(new URL('/dashboard', myURL))
    response.cookies.set("movieSession", session_id, { expires: Date.now() + oneDay, sameSite: "none", secure: true, httpOnly: true, })
    if (session_id) {
      return response
    } else {
      response.cookies.set("movieSession", session_id, { expires: Date.now() + oneDay, sameSite: "none", secure: true, httpOnly: true, })
      return response
    }

  }

  if (req.nextUrl.pathname.startsWith('/logout')) {
    const response = NextResponse.next()
    response.cookies.delete("session");
    return response
  }
}
