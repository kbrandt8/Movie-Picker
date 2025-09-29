import Link from "next/link";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { movie } from '@/utils/getTypes'
export default function Movies(
  { movies }: {
    movies: Array<movie>
  }) {
  const imgLink = `https://image.tmdb.org/t/p/original/`
  const data = movies?.filter((item: any) => item.poster_path !== null)

  return (
    <div className='flex flex-row flex-wrap'>



      {data.map((item: any) => <div key={item.id} className='p-2 m-2'>



        <Card style={{ width: '8rem' }} >
          <Link href={`/movies/${item.id}`}  ><Card.Img variant="top" src={imgLink + item.poster_path} /></Link>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>

          </Card.Body>
        </Card>


      </div>)}
    </div>
  )
}

