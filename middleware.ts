import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const AUTH = process.env.NEXT_PUBLIC_AUTH || ""
  const myURL = process.env.NEXT_PUBLIC_URL || "/"

  if (req.nextUrl.pathname.startsWith('/')) {
    const session = req.cookies.get("movieSession")?.value || ""
    if (session) {
      console.log(session)
    }
  }

  if (req.nextUrl.pathname.startsWith('/approved')) {
    const token = req.nextUrl.searchParams.get("request_token") || ""

    try {
      const request = await fetch(
        'https://api.themoviedb.org/3/authentication/session/new',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AUTH}`,
          },
          body: JSON.stringify({ request_token: token }),
        }
      )

      const data = await request.json()
      const session_id = data.session_id || ""

      const response = NextResponse.redirect(new URL('/dashboard', myURL))

      response.cookies.set("movieSession", session_id, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
        httpOnly: true,
      })

      return response
    } catch (err) {
      console.error("Middleware fetch failed:", err)
      return NextResponse.next()
    }
  }

  if (req.nextUrl.pathname.startsWith('/logout')) {
    const response = NextResponse.next()
    response.cookies.delete("movieSession")
    return response
  }

  return NextResponse.next()
}