import MovieInfo from '@/components/movieInfo/movieInfo'
import { getMovies, getNowPlaying, getPopularMovies, getTopRated, getUpcoming } from '@/utils/getMovies'
import MovieCarousel from '@/components/carousel'
import { HomePage } from '@/components/homepage'

export default async function Home() {

  const nowPlaying = await getNowPlaying()
  const popular = await getPopularMovies()
  const upcoming = await getUpcoming()
  const data = { popular, nowPlaying, upcoming }
  return (
    <div>

      <HomePage data={data} />
    </div>
  )
}
