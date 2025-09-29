'use client'
import Button from 'react-bootstrap/Button';
import { useRouter } from "next/navigation";
import { clearList, deleteList, removeFromList } from "@/utils/getLists"
import Link from 'next/link';
import Movie from '../movie';
export default function List({ list, items, token }:
  {
    list:
    {
      name: string,
      description: string,
      id: number
    },
    items: [
      {
        id: number,
        poster_path: string,
        title: string,
        overview: string,
        vote_average: number,
      }],
    token: string
  }) {

  const router = useRouter();


  return (
    <div className='list' >

      <h1>{list.name}</h1>
      <h2>{list.description}</h2>
      <div className='favMovies'>



        {items?.map((movie: any) => <div className="favMovie listItem" key={movie.id} >
          <Movie movie={movie} width={10} />

          <div>
            <p>{movie.overview}</p>
            <h5 className='text-center'>{movie.vote_average}/10</h5>
            <Button onClick={() => { removeFromList(list.id, movie.id, token); router.refresh() }}>Delete?</Button>

          </div>

        </div>)}
      </div>
      {items !== undefined &&
        <div className="m-2 p-1 text-center">
          <Button className="m-1 p-3 text-center" onClick={() => { clearList(list.id, token); router.refresh() }}>Clear All Items?</Button>
          <Button className="m-1 p-3 text-center" onClick={() => { deleteList(list.id, token); router.push('/account') }} >Delete List?</Button>
        </div>
      }
    </div>
  )
}