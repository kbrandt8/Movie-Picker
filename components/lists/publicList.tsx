import Link from "next/link";
import Movie from "../movie";
const imgLink = `https://image.tmdb.org/t/p/original/`
export default function PublicList({ list }: {
    list: {
        name: string, created_by: string,
        items: [{ title: string, poster_path: string, overview: string, id: string, vote_average: number }]
    }
}) {

    return (<>

        <h1>{list.name}</h1>
        <ul>
            {list.items.map((item: any) => <li key={item.id} className='favMovie listItem'>
                <Movie movie={item} width={8} />
                <div >

                    <p>{item.overview}</p>
                    <p>Average Rating: {item.vote_average}/10</p>
                </div>


            </li>)}
        </ul>

        <h4>Created by: {list.created_by}</h4>

    </>)
}