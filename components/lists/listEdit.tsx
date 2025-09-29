'use client'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useRouter } from 'next/navigation'
import { clearList, deleteList, removeFromList } from "@/utils/getLists"
import Link from 'next/link';
import { useState } from 'react';
import Discover from '../discover/discover';
import { movie } from '@/utils/getTypes';
export default function ListEdit({ list, items, token }: {
  list: {
    backdrop_path: string,
    id: number
  },
  token: string,
  items: Array<movie>
}) {
  const imgLink = `https://image.tmdb.org/t/p/original/`
  const router = useRouter()
  const [edit, setEdit] = useState(false)
  return (
    <div className='list' style={{ backgroundImage: `url(${imgLink}${list.backdrop_path})` }}>

      {!edit && <div className='flex flex-row'>

        <Button onClick={() => setEdit(true)}>Edit</Button>

      </div>}
      {edit && <div> {items?.map((movie: movie) => <div className="movie favMovie" key={movie.id} >

        <Link href={`/movies/${movie.id}`}>

          <Image src={imgLink + movie.poster_path} alt={movie.title} width={75} height={150} />
        </Link>
        <h1>{movie.title}</h1>
        <Button onClick={() => { removeFromList(list.id, movie.id, token); }}>Delete?</Button>
      </div>)}
        {items !== undefined &&
          <div>
            <Button onClick={() => { clearList(list.id, token); }}>Clear All Items?</Button>
            <Button onClick={() => { deleteList(list.id, token); router.push('/account') }} >Delete List?</Button>
          </div>
        }
        <Button onClick={() => setEdit(false)} > Minimize?</Button>
      </div>}
    </div>
  )
}