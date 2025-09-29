'use client'

import Link from 'next/link'
import { movieResult } from '@/utils/getTypes'
import Movie from '../movie'
export default function MovieResults({ data }: { data: Array<movieResult> }) {



  if (data !== undefined && data.length > 0) {

    const movies = data?.filter(item => item.poster_path !== null)
    const imgLink = `https://image.tmdb.org/t/p/original/`
    return (
      <div className='listItem' >

        {movies.map((item: any) =>
          <div key={item.id} >


            <Link href={`/movies/${item.id}`}>

              <Movie width={8} movie={item} />
            </Link>

          </div>
        )}

      </div>)
  }



}
