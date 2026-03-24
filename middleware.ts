import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const AUTH = process.env.NEXT_PUBLIC_AUTH || ""
  const myURL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"

  if (req.nextUrl.pathname.startsWith('/approved')) {
    const request_token = req.nextUrl.searchParams.get("request_token") || ""

    const request = await fetch(
      'https://api.themoviedb.org/3/authentication/session/new',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: AUTH,
        },
        body: JSON.stringify({ request_token }),
      }
    )

    const text = await request.text()
    console.log("TMDB RAW:", text)

    let session_id = ""

    try {
      const data = JSON.parse(text)
      session_id = data.session_id || ""
    } catch (err) {
      console.error("TMDB ERROR:", text)
    }

    if (!session_id) {
      return NextResponse.next()
    }

    const response = NextResponse.redirect(new URL('/dashboard', myURL))

    response.cookies.set("movieSession", session_id, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    })

    return response
  }

  if (req.nextUrl.pathname.startsWith('/logout')) {
    const response = NextResponse.next()
    response.cookies.delete("movieSession")
    return response
  }

  return NextResponse.next()
}