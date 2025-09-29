import MovieInfo from '@/components/movieInfo/movieInfo'
import { getMovies, getRecs, getSimilar, getMovieInfo, getProviders, getTrailer, getCredits } from '@/utils/getMovies'
import MovieCarousel from '@/components/carousel'
import { cookies } from 'next/headers'
import { checkFavorite, getUserAccount, getLists } from '@/utils/getUser'
import Cast from '@/components/movieInfo/castCrew'

export default async function Home({ params }: { params: { movie: string } }) {
  const { movie } = params
  const data = await getMovieInfo(movie)
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value || ""
  const { id } = await getUserAccount(session)
  const lists = await getLists(id)
  const recommended = await getRecs(movie)
  const similar = await getSimilar(movie)
  const { favorite } = await checkFavorite(movie, session)
  const { results } = await getProviders(movie)
  const { US } = results
  const trailerId = await getTrailer(movie)
  const { cast, crew } = await getCredits(movie)





  return (
    <main>
      <MovieInfo
        data={data}
        favorite={favorite}
        user={id}
        session={session}
        lists={lists}
        providers={US}
        trailerId={trailerId}
      />
      <Cast cast={cast} crew={crew} />
      <h1>Recommended</h1>
      <MovieCarousel movies={recommended.results} />
      <h1>Similar</h1>
      <MovieCarousel movies={similar.results} />

    </main>
  )
}
